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

const CategoriesPage = ({storeUrl, userId}) => {

    const isMounted = useRef()
    const params = useParams()
    const categorySlug = params.categoryUrl;
    const [loading, setLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [categories, setCategories] = useState(null)
    const [categoryData, setCategoryData] = useState({
        title: '',
        description: '',
        timeStamp: '',
    })

    const {title, description} = categoryData;

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsDisabled(true)
        const randId = uuidv4().slice(0,7)

        try {

            if(categorySlug) {
                // console.log("updating")
                const categoryDataCopy = {...categoryData}
                const categoryUpdateRef = doc(db, 'shops', storeUrl, 'categories', categorySlug)
                await updateDoc(categoryUpdateRef, categoryDataCopy)

                toast.success("category updated")
                fetchCategories().then()
            }
            else {

                let categoryDataTitle = (categoryData.title).replace(/[^a-zA-Z ]/g, "");
                let catUnique = `${(categoryDataTitle).replace(/,?\s+/g, '-')}-${randId}`
                let catUniqueId = catUnique.toLowerCase();

                // console.log({...formData})
                const categoryDataCopy = {...categoryData}
                categoryDataCopy.categoryUrl = catUniqueId;
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

    const onChange = (e) => {
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
                                                   placeholder="Type here"
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
                                                placeholder="Type here"
                                                rows={4}
                                                className="form-control"
                                                value={description}
                                                onChange={onChange}
                                                required={true}
                                                maxLength={100}
                                                id="description"></textarea>
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
                                                <Table className="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            <div className="form-check">
                                                                <input type="checkbox" className="form-check-input" value=""/>
                                                            </div>
                                                        </th>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        {/*<th>Slug</th>*/}
                                                        <th className="text-end"> Action </th>
                                                    </tr>
                                                    </thead>

                                                    <tbody>
                                                    {/*row one*/}
                                                    {categories.map((category) =>(

                                                        <tr key={category.data.id}>
                                                            <td>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" value=""/>
                                                                </div>
                                                            </td>
                                                            <td>{category.data.id}</td>
                                                            <td className="bold">{category.data.title}</td>
                                                            <td>{category.data.description}</td>
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
