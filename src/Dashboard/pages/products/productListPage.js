import React, {useEffect ,useRef ,useState} from "react";
import {Link ,useNavigate} from "react-router-dom";
import "../pagesStyles.css"
import {Card ,Col ,Row} from "react-bootstrap";
import {getAuth} from "firebase/auth";
import {collection, doc, getDoc, getDocs, query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import Spinner from "../../../components/Spinner";
import ProductBox from "./productBox";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg";

const ProductListPage = () => {

    const [products, setProducts] = useState(null)
    const auth = getAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const isMounted = useRef()

    const fetchProducts = async (shopName) => {
        try
        {
            const prodRef = collection(db, 'shops', shopName, 'products')
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

            const getUser = async () =>{
                setLoading(true)
                const profileRef = doc(db, 'users', auth.currentUser.uid)
                const profileSnap =  await getDoc(profileRef)

                if(profileSnap.exists()){
                    //  console.log(profileSnap.data())
                    if (profileSnap.data().shopActivated){
                        fetchProducts(profileSnap.data().shopUrl)

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
                            <Col lg={2} md={3} className="col-6">
                                <select className="form-select">
                                    <option value="status">All category</option>
                                    <option value="Active">Electronics</option>
                                    <option value="Disabled">Clothings</option>
                                    <option value="Show all">Others</option>
                                </select>
                            </Col>

                            <Col lg={2} md={3} className="col-6">
                                <select className="form-select">
                                    <option value="show 20">Latest added</option>
                                    <option value="show 20">Cheap first</option>
                                    <option value="show 20">Most viewed</option>
                                </select>
                            </Col>
                        </Row>
                    </header>
                    {loading ?
                        (<Spinner />)
                        : products && products.length > 0 ?
                            (<>
                    <div className="card-body">
                        <Row className="gx-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5">
                            {/*column one*/}

                            {products.map((product) => (
                                <Col className="col" key={product.id}>
                                    <ProductBox product={product.data} id={product.id} />
                                </Col>
                            ))}

                        </Row>

                        <nav className="float-end mt-4" aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item disabled">
                                    <Link to="https://" className="page-link">Previous</Link>
                                </li>
                                <li className="page-item active">
                                    <Link to="https://" className="page-link">1</Link>
                                </li>
                                <li className="page-item">
                                    <Link to="https://" className="page-link">2</Link>
                                </li>
                                <li className="page-item">
                                    <Link to="https://" className="page-link">3</Link>
                                </li>
                                <li className="page-item disabled">
                                    <Link to="https://" className="page-link">Next</Link>
                                </li>
                            </ul>
                        </nav>

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
