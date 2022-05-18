import AdminNavbar from "../../components/AdminNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import React, {useEffect ,useRef ,useState} from "react";
import {getAuth} from "firebase/auth";
import {collection ,doc ,getDoc ,getDocs ,orderBy ,query ,serverTimestamp ,setDoc} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage'
import {db} from "../../firebase.config";
import {toast} from "react-toastify";
import Spinner from "../../components/Spinner";
import {v4 as uuidv4} from "uuid";
import {Link ,useNavigate} from "react-router-dom";

const InsertProduct = () => {
    const [categories, setCategories] = useState([])
    const [shopUrl, setShopUrl] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const auth = getAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const isMounted = useRef()
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        productPrice: 0,
        productDiscountPrice: 0,
        productDescription: '',
        images: [],
        offer: false,
        timestamp: '',
    })

    const {
        productName,
        productCategory,
        productPrice,
        productDiscountPrice,
        productDescription,
        images,
        offer} = formData

    const onSubmit = async (e) => {
        e.preventDefault()
        const randId = uuidv4().slice(0,7)
        try{
            //disable button
            setDisabled(true)
            //generate unique ID for product
            let formDataName = (formData.productName).replace(/[^a-zA-Z ]/g, "");
            let prodUnique = `${(formDataName).replace(/,?\s+/g, '-')}-${randId}`
            let prodUniqueId = prodUnique.toLowerCase();

            //console.log(formData.productCategory)
            //console.log("working")

            //store image in firebase storage
            const storeImage = async (image) => {
                return new Promise((resolve, reject) => {
                    const storage = getStorage()
                    const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                    const storageRef = ref(storage, `products/${auth.currentUser.uid}/` + fileName)

                    const uploadTask = uploadBytesResumable(storageRef, image)

                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            console.log('Upload is ' + progress + '% done')
                            switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused')
                                    break
                                case 'running':
                                    console.log('Upload is running')
                                    break
                                default:
                                    console.log('Default Case')
                                    break
                            }
                        },
                        (error) => {
                            // Handle unsuccessful uploads
                            reject(error)
                        },
                        () => {
                            // Handle successful uploads on complete
                            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                resolve(downloadURL)
                            })
                        }
                    )
                })
            }
            //console.log(formData)
            const imgUrls = await Promise.all(
                [...images].map((image) => storeImage(image))
            ).catch(() => {
                setLoading(false)
                toast.error('Images not uploaded ')
                return
            })
            const formDataCopy = {
                ...formData,
                imgUrls,
                uniqueId: prodUniqueId,
                timestamp: serverTimestamp(),
            }
            delete formDataCopy.images
            !formDataCopy.offer && delete formDataCopy.productDiscountPrice
            await setDoc(doc(db, 'shops', shopUrl, 'products', prodUniqueId ), formDataCopy)
            setFormData((prevState) => ({
                ...prevState,
                productName: '',
                productCategory: '',
                productPrice: 0,
                productDiscountPrice: 0,
                productDescription: '',
                images: {},
                offer: false,
            }))
            setDisabled(false)
            setLoading(false)
            toast.success('product uploaded successfully')

        }
        catch (error) {
            console.log({error})
            toast.error("unable to insert product")
            setDisabled(false)
        }
    }

    const onChange = (e) => {
        let boolean = null

        if (e.target.value === 'true') {
            boolean = true
        }
        if (e.target.value === 'false') {
            boolean = false
        }

        //Files
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files,
            }))
        }

        //Text/Numbers/booleans
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }))
        }
    }


    const fetchCategories = async (shopName) => {

        try {
            setLoading(true)
            const catRef = collection(db ,'shops' ,shopName ,'category')
            const q = query(catRef, orderBy('timestamp', "desc"))
            const querySnap = await getDocs(q)

            querySnap.forEach((doc) => {
                //console.log(doc.data())
                return categories.push({
                    id: doc.id ,
                    data: doc.data() ,
                })

            })
            setCategories(categories)
            setLoading(false)
        } catch (error) {
            toast.error("Error getting categories")
            console.log({error})
        }
    }


    useEffect(() => {
        if(isMounted) {
            const getUser = async () =>{
                setLoading(true)
                const profileRef = doc(db, 'users', auth.currentUser.uid)
                const profileSnap =  await getDoc(profileRef)

                if(profileSnap.exists()){
                    //  console.log(profileSnap.data())
                    if (profileSnap.data().shopActivated){
                        setShopUrl(profileSnap.data().shopUrl)
                        fetchCategories(profileSnap.data().shopUrl)
                    }
                    else
                    {
                        navigate('/activate-shop')
                    }

                }
            }
            getUser()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, auth.currentUser.uid])

    return (
        <>
            <AdminNavbar />



            <Container className="Product">
                {loading ?
                    (<Spinner />) :

                    (
                <Row className="justify-content-center">
                    <Col md={6}>
                        <div className="head-text">
                            <h4>Insert Product</h4>
                            <div className="right-button">
                                <Link to="/view-products" className="btn btn-md btn-success">View Products</Link>
                            </div>
                        </div>
                        {loading ?
                            (
                                <Spinner />
                            )
                            :

                            (<Form className="Form-product" onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                           id="productName"
                                           value={productName}
                                           placeholder="Product Name"
                                           required={true}
                                           onChange={onChange}
                                           className="form-control"/>
                                </div>
                                    <div className="form-group">
                                        <select
                                                id='productCategory'
                                                className='form-control'
                                                required={true}
                                                value={productCategory}
                                                onChange={onChange}
                                                placeholder='Select product category'
                                            >
                                            <option value="DEFAULT" disabled>
                                                    Select product category...
                                            </option>
                                            {categories.map((category) => (
                                                <option key={category.id}
                                                        value={category.data.categoryUrl}>{category.data.title}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                <div className="form-group">
                                    <select
                                        id='offer'
                                        className='form-control'
                                        required={true}
                                        value={offer}
                                        onChange={onChange}
                                        placeholder='Discount Offer ?'
                                    >
                                        <option value='disable' disabled={true} selected={true}>
                                            Select YES/NO if product has discount offer...
                                        </option>
                                        <option value={true}>YES</option>
                                        <option value={false}>NO</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <input type="number"
                                           id="productPrice"
                                           value={productPrice}
                                           onChange={onChange}
                                           placeholder="Product Price"
                                           required={true}
                                           className="form-control"/>
                                </div>

                                    {offer && (
                                        <div className="form-group">
                                            <input type="number"
                                                   id="productDiscountPrice"
                                                   value={productDiscountPrice}
                                                   onChange={onChange}
                                                   placeholder="Product Discount Price"
                                                   required={offer}
                                                   className="form-control"/>
                                        </div>
                                    )}

                                <div className="form-group">
                                    <textarea id="productDescription"
                                          cols="30"
                                          rows="5"
                                          value={productDescription}
                                          onChange={onChange}
                                          required={true}
                                          className="form-control"
                                          placeholder="Product Description">
                                    </textarea>
                                </div>

                                    <div className='form-group'>
                                        <label htmlFor='gig-image' className="label"> Insert Product Image</label>
                                        <p className='info'>
                                            The first image will be the cover (max 3).
                                        </p>
                                        <input
                                            type='file'
                                            onChange={onChange}
                                            max='3'
                                            accept='image/*'
                                            multiple
                                            required={true}
                                            className='form-control image-file'
                                        />
                                    </div>
                                    <div className="form-group button">
                                        <Button disabled={disabled} className="btn btn-md btn-primary" type="submit">
                                            Insert Product
                                        </Button>

                                    </div>
                            </Form>
                            )
                        }
                    </Col>

                </Row>
                    ) }

            </Container>
        </>
    )

}
export default InsertProduct
