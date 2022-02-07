import AdminNavbar from "../components/AdminNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import ViewProducts from "./viewProducts";
import {useEffect ,useRef ,useState} from "react";
import {getAuth} from "firebase/auth";
import {collection ,doc ,getDocs ,orderBy ,query ,serverTimestamp ,setDoc} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage'
import {db} from "../firebase.config";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";
import {v4 as uuidv4} from "uuid";

const InsertProduct = () => {
    const [categories, setCategories] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [products, setProducts] = useState(null)
    const auth = getAuth()
    const [loading, setLoading] = useState(true)
    const isMounted = useRef()
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        productPrice: 0,
        productDiscountPrice: 0,
        productDescription: '',
        images: {},
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
        try{
            //disable button
            setDisabled(true)
            //generate unique ID for product
            let prodUniqueId = `${formData.productName
                .replace(/,?\s+/g, '-')
                .toLowerCase()}-${uuidv4()}`

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
            await setDoc(doc(db, 'shops', auth.currentUser.uid, 'products', prodUniqueId ), formDataCopy)
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
            await fetchProducts()
        }
        catch (error) {
            console.log({error})
            toast.error("unable to insert product")
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

    const fetchProducts = async () => {
        try
        {
            const auth = getAuth()
            const prodRef = collection(db, 'shops', auth.currentUser.uid, 'products')
            const q = query(prodRef)
            const querySnap = await getDocs(q)

            let products = []

            querySnap.forEach((doc) => {
                //console.log(doc.data());
                return products.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setProducts(products)
            setLoading(false)

        }
        catch (error) {
            console.log({error})
            toast.error("Unable to retrieve products")

        }
    }


    useEffect(() => {
        if(isMounted) {
            const fetchCategories = async () => {
                try {
                    const auth = getAuth()
                    const catRef = collection(db ,'shops' ,auth.currentUser.uid ,'category')
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
            fetchCategories()
            fetchProducts()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, auth.currentUser.uid])

    return (
        <>
            <AdminNavbar />
            <Container className="Product" >
                <Row>
                    <Col md={4}>
                        <h4>Insert Product</h4>
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
                                        <label htmlFor='gig-image'> Insert Product Image</label>
                                        <p className='info'>
                                            The first image will be the cover (max 3).
                                        </p>
                                        <input
                                            type='file'
                                            onChange={onChange}
                                            max='3'
                                            accept='.jpeg,.jpg,.png'
                                            multiple
                                            required={true}
                                            className='form-control image-file'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Button disabled={disabled} className="btn btn-md btn-primary" type="submit">
                                            Insert Product
                                        </Button>

                                    </div>
                            </Form>
                            )
                        }

                    </Col>
                    <Col md={8} className="Prod-head">
                            <h4>View Products</h4>
                        {loading ?
                            (<Spinner />)
                            : products && products.length > 0 ?
                                (<>
                                <h6>{products.length} Product(S)</h6>
                                <Row>
                                    {products.map((product) => (
                                        <Col md={4} key={product.id}>
                                            <ViewProducts product={product.data} id={product.id} />
                                        </Col>
                                    ))}

                                </Row>
                                </>) :
                                (<h6>No product available</h6>)
                        }


                    </Col>
                </Row>

            </Container>
        </>
    )

}
export default InsertProduct
