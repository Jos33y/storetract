import AdminNavbar from "../../components/AdminNavbar";
import '../styles.css'
import {Col ,Container, Row} from "react-bootstrap";
import {useEffect ,useRef ,useState} from "react";
import {getAuth} from "firebase/auth";
import {collection, doc, getDoc, getDocs, query} from "firebase/firestore";

import {db} from "../../firebase.config";
import {toast} from "react-toastify";
import Spinner from "../../components/Spinner";
import {Link ,useNavigate} from "react-router-dom";
import ProductBox from "./ProductBox";
import NotFoundImage from "../../assets/images/dashimages/undraw_not_found_-60-pq.svg";

const ViewProducts = () => {
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
            <AdminNavbar />

            <Container className="Product">
                {loading ?
                    (<Spinner />) :
                    (
                        <Row className="justify-content-center">
                            <Col md={12} className="Prod-head">
                                {loading ?
                                    (<Spinner />)
                                    : products && products.length > 0 ?
                                        (<>
                                            <div className="head-text">
                                                <h4>View Products</h4>
                                                <div className="right-button">
                                                    <Link to="/insert-product" className="btn btn-md btn-success">insert products</Link>
                                                </div>
                                            </div>

                                            <h6>{products.length} Product(s)</h6>
                                            <Row>
                                                {products.map((product) => (
                                                    <Col md={3} key={product.id}>
                                                        <ProductBox product={product.data} id={product.id} />
                                                    </Col>
                                                ))}

                                            </Row>
                                        </>) :
                                        ( <div className="No-category">
                                            <h5>No Product Available</h5>
                                            <img src={NotFoundImage} alt="" className="img-fluid"/>
                                        </div>)
                                }


                            </Col>
                        </Row>
                    ) }

            </Container>
        </>
    )

}
export default ViewProducts
