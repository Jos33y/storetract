import React, {useEffect ,useRef ,useState} from "react";
import {Link} from "react-router-dom";
import "../pagesStyles.css"
import {Card ,Col ,Row} from "react-bootstrap";
import {getAuth} from "firebase/auth";
import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import Spinner from "../../../components/Spinner";
import ProductBox from "./productBox";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg";

const ProductListPage = ({storeUrl}) => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const auth = getAuth()
    const [loading, setLoading] = useState(false)
    const [loadingTwo, setLoadingTwo] = useState(false)

    const isMounted = useRef()

    const fetchProducts = async (changeCat) => {
        setLoadingTwo(true)
        let catChange = changeCat ? changeCat : 'all';
        try
        {
            const prodRef = collection(db, 'shops', storeUrl, 'products')
            let q;
            if(catChange === 'all') {
                q = query(prodRef, orderBy('timeStamp', 'desc'),)
            }
            else{
                q = query(prodRef, where("productCategory", "==", `${catChange}`))

            }
            const querySnap = await getDocs(q)
            let products = []

            querySnap.forEach((doc) => {
                return products.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setProducts(products)
        }
        catch (error) {
            console.log({error})
            toast.error("Unable to retrieve products")

        }
        setLoading(false)
        setLoadingTwo(false)
    }

    const onChange = (e) => {

            fetchProducts(e.target.value).then()

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
    }

    useEffect(() => {
        if(isMounted) {

            fetchCategories().then()
            fetchProducts().then()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, auth.currentUser.uid])

    return (
        <>
            {loading ?
                (<Spinner />) :
                (
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Manage Products </h2>
                    <div>
                        <Link to="/dashboard/add-product" className="btn btn-primary"> Create New</Link>
                    </div>
                </div>

                <Card className="card mb-4">
                    <header className="card-header">
                        <Row className="gx-3">
                            <Col lg={4} md={6} className="me-auto">
                                <input type="text" placeholder="Search..." className="form-control"/>
                            </Col>
                            <Col lg={4} md={6} className="col-6">
                                <select className="form-select"
                                        id='productCategory'
                                        onChange={onChange}>
                                    <option value='all'>
                                        All category
                                    </option>
                                    {categories.map((category) => (
                                    <option value={category.data.categoryUrl} key={ category.id } > {category.data.title} </option>
                                    ))}
                                </select>
                            </Col>

                            {/*<Col lg={2} md={3} className="col-6">*/}
                            {/*    <select className="form-select">*/}
                            {/*        <option value="show 20">Latest added</option>*/}
                            {/*        <option value="show 20">Cheap first</option>*/}
                            {/*        <option value="show 20">Most viewed</option>*/}
                            {/*    </select>*/}
                            {/*</Col>*/}
                        </Row>
                    </header>
                    {loadingTwo ?
                        (<Spinner />)
                        : products && products.length > 0 ?
                            (<>
                    <div className="card-body">
                        <Row className="gx-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5">
                            {/*column one*/}

                            {products.map((product) => (
                                <Col className="col" key={product.id}>
                                    <ProductBox product={product.data} id={product.id} storeUrl={storeUrl} />
                                </Col>
                            ))}

                        </Row>

                        {/*<nav className="float-end mt-4" aria-label="Page navigation">*/}
                        {/*    <ul className="pagination">*/}
                        {/*        <li className="page-item disabled">*/}
                        {/*            <Link to="/dashboard/products" className="page-link">Previous</Link>*/}
                        {/*        </li>*/}
                        {/*        <li className="page-item active">*/}
                        {/*            <Link to="/dashboard/products" className="page-link">1</Link>*/}
                        {/*        </li>*/}
                        {/*        <li className="page-item">*/}
                        {/*            <Link to="/dashboard/products" className="page-link">2</Link>*/}
                        {/*        </li>*/}
                        {/*        <li className="page-item">*/}
                        {/*            <Link to="/dashboard/products" className="page-link">3</Link>*/}
                        {/*        </li>*/}
                        {/*        <li className="page-item disabled">*/}
                        {/*            <Link to="/dashboard/products" className="page-link">Next</Link>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</nav>*/}

                    </div>
                                </>
                    ) :
                    ( <div className="No-category">
                        <h5>No Product Available</h5>
                        <img src={NotFoundImage} alt="" className="img-fluid"/>
                    </div>
                    )
                    }
                </Card>
            </section>
                ) }
            {/*<Link to="/dashboard/products/7899"> Details</Link>*/}
        </>
    )

}
export default ProductListPage
