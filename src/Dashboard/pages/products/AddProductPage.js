import React, {useEffect, useRef, useState} from "react";
import "../pagesStyles.css";
import {Link} from "react-router-dom";
import {Button ,Card ,Col ,Form ,Row} from "react-bootstrap";
import {collection, doc, getDocs, limit, orderBy, query, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import AddImages from "../../../assets/images/add-image.png";
import {v4 as uuidv4} from "uuid";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";

const AddProductPage = ({userId, storeUrl}) => {

    const isMounted = useRef()

    // const [loading, setLoading] = useState(true)
    const [isDisabled, setDisabled] = useState(false)
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState(null)
    let fileArray = [];
    let fileObj = [];
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        productPrice: 0,
        productDescription: '',
        images: {},
        timeStamp: '',
    })

    const {
        productName,
        productCategory,
        productPrice,
        productDescription,
        images,
    } = formData

    const onSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        const randId = uuidv4().slice(0,7)
        try{
            //disable button
            //generate unique ID for product
            let formDataName = (formData.productName).replace(/[^a-zA-Z ]/g, "");
            let prodUnique = `${(formDataName).replace(/,?\s+/g, '-')}-${randId}`
            let prodUniqueId = prodUnique.toLowerCase();

            // console.log(formData.productCategory)
            // console.log("working")

            // console.log(formData)
            const imgUrls = await Promise.all(
                [...images].map((image) => storeImage(image))
            ).catch(() => {
                // setLoading(false)
                toast.error('Images not uploaded ')
                return
            })
            const formDataCopy = {
                ...formData,
                imgUrls,
                uniqueId: prodUniqueId,
                timeStamp: serverTimestamp(),
            }
            delete formDataCopy.images
            // !formDataCopy.offer && delete formDataCopy.productDiscountPrice
            await setDoc(doc(db, 'shops', storeUrl, 'products', prodUniqueId ), formDataCopy)
            setFormData((prevState) => ({
                ...prevState,
                productName: '',
                productCategory: '',
                productPrice: 0,
                productDescription: '',
                images: {},
            }))
            setImage('')
            toast.success('product uploaded successfully')

        }
        catch (error) {
            console.log({error})
            toast.error("unable to insert product")
        }
        setDisabled(false)
        // setLoading(false)
    }

    //store image in firebase storage
    const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage()
            const fileName = `${userId}-${image.name}-${uuidv4()}`

            const storageRef = ref(storage, `products/${userId}/` + fileName)

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

    const fetchCategories = async () => {
        try
        {
            // const auth = getAuth()
            const catRef = collection(db, 'shops', storeUrl, 'categories' )
            const q = query(catRef, orderBy('timeStamp', 'desc'), limit(10))
            const querySnap = await getDocs(q)

            let categories = [];

            querySnap.forEach((doc) => {
                //console.log(doc.data())
                return categories.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            if(categories === null){
                toast.success("create cateogory first");
                window.location.href = "/dashboard/categories"
            }
            else{
                setCategories(categories)
            }

            // setLoading(false)
        }
        catch (error) {
            toast.error("could not fetch categories")
            console.log({error})
        }
        // setLoading(false)
    }

    const onChange = (e) => {
        //Files
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files,
            }))
            fileObj.push(e.target.files)
            // console.log(fileObj[0].length)
            for (let i = 0; i < fileObj[0].length; i++) {
                fileArray.push(URL.createObjectURL(fileObj[0][i]))
            }
            setImage(fileArray)
        }

        //Text/Numbers/booleans
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }))
        }
    }

    useEffect(() => {

        if(isMounted) {
            fetchCategories().then()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, userId])

    return (
        <>
            <section className="content-main" style={{maxWidth: "720px"}}>
                <div className="content-header">
                    <h2 className="content-title"> Create Product</h2>
                    <div>
                        <Link to="/dashboard/home" className="btn btn-md btn-outline-danger"><i
                            className="fas fa-external-link-alt"></i> Discard</Link>
                    </div>
                </div>

                <Card className="card mb-4">
                    <div className="card-body">

                        <Form onSubmit={onSubmit}>
                            <div className="mb-4">
                                <label htmlFor="product-name" className="form-label">Product title  </label>
                                <input type="text"
                                       placeholder="Type here..."
                                       className="form-control"
                                       id="productName"
                                       value={productName}
                                       onChange={onChange}
                                       maxLength={100}
                                       required={true}/>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="full description" className="form-label">Product description  </label>
                                <textarea name="description"
                                          className="form-control"
                                          placeholder="Type here..."
                                          id="productDescription"
                                          rows="4"
                                          onChange={onChange}
                                          maxLength={2000}
                                          value={productDescription}
                                          required={true}></textarea>
                            </div>

                            <Row className="gx-2">
                                <Col sm={6} className="mb-4">
                                    <label htmlFor="product-price" className="form-label">Product Price (&#8358;)  </label>
                                    <input type="number"
                                           className="form-control"
                                           value={productPrice}
                                           onChange={onChange}
                                           required={true}
                                           id="productPrice"/>
                                </Col>

                                <Col sm={6} className="mb-4">
                                    <label className="form-label" htmlFor="category">Category</label>
                                    <select name="category"
                                            className="form-select"
                                            required={true}
                                            id='productCategory'
                                            value={productCategory}
                                            onChange={onChange}
                                    >
                                        <option value="select">select category</option>
                                        {categories.map((category) => (
                                            <option key={category.id}
                                                    value={category.data.categoryUrl}>{category.data.title}
                                            </option>
                                        ))}
                                    </select>
                                </Col>

                            </Row>

                            <div className="mb-4">
                                <div className="Images-row">
                                    <Row>
                                        <Col md={3} className="col-6">
                                            <label htmlFor="upload-photo-one" className="card card-thumb">
                                                <div style={{margin: "auto"}} className="text-center">
                                                    <img src={AddImages} alt="products " className="img-fluid"/>
                                                </div>
                                                <h5 className="card-title">select images</h5>
                                            </label>
                                            <input type="file"
                                                   className="form-control"
                                                   id="upload-photo-one"
                                                   onChange={onChange}
                                                   accept='image/*'
                                                   multiple
                                                   max={3}
                                                   required={true}
                                                   hidden={true}/>
                                        </Col>
                                            {(image || []).map(url => (
                                                <Col md={3} className="col-6">

                                                        <Card className="card card-thumb">
                                                            <img
                                                                src={url}
                                                                alt="products"
                                                                className="card-img-top"/>
                                                        </Card>

                                                </Col>
                                            )) }
                                    </Row>
                                </div>
                            </div>


                            <div className="mb-4">
                                <Button
                                    disabled={isDisabled}
                                    type="submit"
                                    className="btn btn-md btn-primary">Save Product</Button>
                            </div>

                        </Form>
                    </div>
                </Card>
            </section>
        </>
    )

}

export default AddProductPage


