import React, {useEffect, useRef, useState} from "react";
import "../pagesStyles.css";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import {
    collection,
    deleteDoc,
    doc, getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp, setDoc,
    updateDoc
} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import {Link, useParams} from "react-router-dom";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg";
import {v4 as uuidv4} from "uuid";
import Spinner from "../../../components/Spinner";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";

const CategoriesPage = ({storeUrl, userId}) => {

    const isMounted = useRef()
    const params = useParams()
    let fileArray;
    let fileObj;
    const categorySlug = params.categoryUrl;
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)
    const [categories, setCategories] = useState(null)
    const [categoryData, setCategoryData] = useState({
        title: '',
        description: '',
        categoryImage: '',
        timeStamp: '',
    })

    const {title, description, categoryImage} = categoryData;

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsDisabled(true)
        const randId = uuidv4().slice(0,7)


        try {
            let imgUrl;
            const categoryImgUrl = await Promise.all(
                [...categoryImage].map((image) => storeImage(image))
            ).catch(() => {
                // setLoading(false)
                return
            })
            if(categorySlug) {

                if(!categoryImgUrl)
                {
                    imgUrl = categoryImage;
                }
                else{
                    imgUrl = categoryImgUrl;
                }

                console.log("img url", imgUrl)
                const categoryDataCopy = {...categoryData}
                categoryDataCopy.categoryImage = imgUrl;
                const categoryUpdateRef = doc(db, 'shops', storeUrl, 'categories', categorySlug)
                await updateDoc(categoryUpdateRef, categoryDataCopy)

                toast.success("category updated")
                fetchCategories().then()
            }
            else {
                const categoryImgUrl = await Promise.all(
                    [...categoryImage].map((image) => storeImage(image))
                ).catch(() => {
                    // setLoading(false)
                    toast.error('Image file too large')
                    return
                })
                // console.log("url", storeBannerUrls);

                let categoryDataTitle = (categoryData.title).replace(/[^a-zA-Z ]/g, "");
                let catUnique = `${(categoryDataTitle).replace(/,?\s+/g, '-')}-${randId}`
                let catUniqueId = catUnique.toLowerCase();

                // console.log({...formData})
                const categoryDataCopy = {...categoryData}
                categoryDataCopy.categoryUrl = catUniqueId;
                categoryDataCopy.categoryImage = `${categoryImgUrl}`;
                categoryDataCopy.timeStamp = serverTimestamp();
                const categoryRef = doc(db, 'shops', storeUrl, 'categories', catUniqueId)
                await setDoc(categoryRef, categoryDataCopy)

                toast.success("category inserted")
                fetchCategories().then()
            }
        } catch (error) {
            console.log({error})
            toast.error("Error in inserting category")
        }
        setIsDisabled(false)
    }


    //store image in firebase storage
    const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage()
            console.log(image.name)
            const fileName = `${userId}-${image.name}-${uuidv4()}`

            const storageRef = ref(storage, `categoryImages/${userId}/` + fileName)

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

    const onChange = (e) => {

        if (e.target.files) {
            setCategoryData((prevState) => ({
                ...prevState,
                categoryImage: e.target.files,
            }))
            console.log(categoryImage);
            fileObj = e.target.files;
            console.log(fileObj)
            // console.log(fileObj[0].length)
            fileArray = URL.createObjectURL(fileObj[0]);
            setImage(fileArray)
            console.log(fileArray)
        }

        setCategoryData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        } ))
    }

    const getCategory = async () =>{

        try {
            const categoryRef = doc(db, 'shops', storeUrl, 'categories', categorySlug)
            const categorySnap =  await getDoc(categoryRef)

            if(categorySnap.exists()){
                // console.log(categorySnap.data())
                setCategoryData(categorySnap.data())
            }
        }
        catch (error) {
            console.log({error})
        }
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
            setCategories(categories)
            // setLoading(false)
        }
        catch (error) {
            toast.error("could not fetch categories")
            console.log({error})
        }
        setLoading(false)
    }

    const onDelete  = async(ID) => {
        console.log(ID)
        try {
            const catRef = doc(db, 'shops', storeUrl, 'categories', ID)
            await deleteDoc(catRef)

            toast.success("deleted successfully")
            fetchCategories().then()
        }
        catch (error) {
            console.log({error})
        }
    }

    useEffect(() => {

        if(isMounted) {
            if(params.categoryUrl) {
                getCategory().then()
            }

           fetchCategories().then()
            console.log(categoryImage)
            console.log(image)
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, userId])

    return (
        <>
            {loading ?
                (<Spinner />) :
                (

            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Categories </h2>
                </div>

                <Card className="card">
                    <div className="card-body">
                        <Row>
                            <Col md={4}>
                                <>
                                    <Form onSubmit={onSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="category_name" className="form-label"> Category Name</label>
                                            <input type="text"
                                                   placeholder="Men's Fashion"
                                                   className="form-control"
                                                   value={title}
                                                   onChange={onChange}
                                                   required={true}
                                                   maxLength={20}
                                                   id="title"/>
                                        </div>



                                        <div className="mb-4">
                                            <label htmlFor="category_description" className="form-label"> Category Description</label>
                                            <textarea
                                                placeholder="Quality and standard wears for Men."
                                                rows={4}
                                                className="form-control"
                                                value={description}
                                                onChange={onChange}
                                                required={true}
                                                maxLength={100}
                                                id="description"></textarea>
                                        </div>

                                        <div className="mb-4 image-placeholder">
                                            <label>Category Image: </label>
                                            <label  htmlFor="upload-cover-photo">
                                                <div className="placeholder-container">
                                                    <img src={`${image ? (image) : (categoryImage ? (categoryImage) : ('https://placehold.jp/340x340.png'))}`} alt="" className="img-fluid"/>
                                                </div>
                                            </label>
                                            <input type="file"
                                                   id="upload-cover-photo"
                                                   accept='image/*'
                                                   hidden={true}
                                                   onChange={onChange}
                                                   className="form-control" />
                                        </div>

                                        <div className="d-grid">
                                            <Button
                                                type="submit"
                                                disabled={isDisabled}
                                                className="btn btn-md btn-primary">{categorySlug ? ('Update Category') : ('Create category')}  </Button>
                                        </div>
                                    </Form>
                                </>
                            </Col>
                            <Col md={8}>
                                <>
                                    {categories && categories.length > 0 ?
                                        (
                                            <>
                                                <Table className="table table-hover category-table">
                                                    <thead>
                                                    <tr>
                                                        {/*<th>*/}
                                                        {/*    <div className="form-check">*/}
                                                        {/*        <input type="checkbox" className="form-check-input" value=""/>*/}
                                                        {/*    </div>*/}
                                                        {/*</th>*/}
                                                        <th></th>
                                                        <th>Name</th>
                                                        {/*<th>Slug</th>*/}
                                                        <th className="text-end"> Action </th>
                                                    </tr>
                                                    </thead>

                                                    <tbody>
                                                    {/*row one*/}
                                                    {categories.map((category) =>(

                                                        <tr key={category.data.id}>
                                                            {/*<td>*/}
                                                            {/*    <div className="form-check">*/}
                                                            {/*        <input type="checkbox" className="form-check-input" value=""/>*/}
                                                            {/*    </div>*/}
                                                            {/*</td>*/}
                                                            <td>
                                                                <div className="category-table-img">
                                                                    <img src={`${category.data.categoryImage ?  (`${category.data.categoryImage}`) : 'https://placehold.jp/70x70.png'}`} alt="" className="img-fluid"/>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="info-details">
                                                                    <h6>{category.data.title}</h6>
                                                                    <p>{category.data.description} </p>
                                                                </div>

                                                            </td>
                                                            {/*<td>/{category.categoryUrl}</td>*/}
                                                            <td className="text-end">
                                                                <div className="dropdown">
                                                                    <Link to="#" data-bs-toggle="dropdown" className="btn btn-outline-secondary">
                                                                        <i className="fas fa-ellipsis-v"></i>
                                                                    </Link>
                                                                    <div className="dropdown-menu">
                                                                        <a href={ `/dashboard/categories/${category.id}`} className="dropdown-item"> Edit info</a>
                                                                        <Button type="button" onClick={() => {onDelete(category.id).then()}} className="dropdown-item text-danger"> Delete</Button>
                                                                    </div>
                                                                </div> {/* dropdown ends*/}
                                                            </td>

                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </Table>
                                            </>
                                        ) :
                                        (
                                            <div className="No-category">
                                                <h5>No Categories</h5>
                                                <img src={NotFoundImage} alt="" className="img-fluid"/>
                                            </div>

                                        )}
                                </>
                            </Col>
                        </Row>
                    </div>
                </Card>

            </section>
                ) }

            </>
    )

}

export default CategoriesPage
