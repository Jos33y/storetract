import React ,{useEffect ,useRef ,useState} from "react";
import AdminNavbar from "../components/AdminNavbar";
import {Col ,Container ,Row} from "react-bootstrap";
import {doc ,getDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";
import ShopIcon from "../assets/images/dashimages/store.png"
import CategoryIcon from "../assets/images/dashimages/categories.png"
import OrderIcon from "../assets/images/dashimages/list.png"
import PlanIcon from "../assets/images/dashimages/annual.png"
import ProductIcon from "../assets/images/dashimages/ecommerce.png"
import ProfileIcon from "../assets/images/dashimages/resume.png"

const AdminDashboard = () => {

    const [loading, setLoading] = useState(true)

    const isMounted = useRef()
    const auth = getAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(isMounted) {

            const getUser = async () =>{
                setLoading(true)
                const profileRef = doc(db, 'users', auth.currentUser.uid)
                const profileSnap =  await getDoc(profileRef)

                if(profileSnap.exists()){
                    //  console.log(profileSnap.data())
                    if (profileSnap.data().shopActivated){

                        setLoading(false)
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
    }, [isMounted, auth.currentUser.uid])


    return(
        <>
            <AdminNavbar />
            {loading ?
                (<Spinner />) :

                (
            <Container>
                <div className="Dashboard">
                    {/*<h3>Welcome back Joseph </h3>*/}
                    <Row>
                        <Col md={4}>
                            <div className="Card-box">
                                <img src={CategoryIcon} alt="" className="img-fluid"/>
                                <div className="text">
                                    <h5>Category</h5>
                                    <p>Insert and view your different product categories</p>
                                </div>

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="Card-box">
                                <img src={ProductIcon} alt="" className="img-fluid"/>
                                <div className="text">
                                    <h5>Product</h5>
                                    <p>Insert and view your different products</p>
                                </div>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="Card-box">
                                <img src={OrderIcon} alt="" className="img-fluid"/>
                                <div className="text">
                                    <h5>Orders</h5>
                                    <p>Manage all your orders in one place</p>
                                </div>
                            </div>
                        </Col>

                    </Row>

                    {/*another row*/}
                    <Row>

                        <Col md={4}>
                            <div className="Card-box">
                                <img src={ProfileIcon} alt="" className="img-fluid"/>
                                <div className="text">
                                    <h5>Profile</h5>
                                    <p>View and update personal and shop profile</p>
                                </div>
                            </div>
                        </Col>


                        <Col md={4}>
                            <div className="Card-box">
                                <img src={ShopIcon} alt="" className="img-fluid"/>
                                <div className="text">
                                    <h5>Shop</h5>
                                    <p>view how your customers see your shop</p>
                                </div>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="Card-box">
                                <img src={PlanIcon} alt="" className="img-fluid"/>
                                <div className="text">
                                    <h5>Subscriptions</h5>
                                    <p>Mange all your plans here</p>
                                </div>
                            </div>
                        </Col>


                    </Row>
                </div>
            </Container>
                ) }
        </>
    )

}

export default AdminDashboard
