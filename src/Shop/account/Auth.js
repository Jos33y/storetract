import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import React ,{useEffect ,useRef ,useState} from "react";
import './styles.css'
import Spinner from "../../components/Spinner";
import ShopNavHeader from "../components/ShopNavHeader";
import ShopHeader from "../components/ShopHeader";
import CategorySection from "../components/CategorySection";
import {Link ,useParams} from "react-router-dom";
import ShopFooter from "../components/ShopFooter";
import {doc ,getDoc} from "firebase/firestore";
import {db} from "../../firebase.config";

const ShopAuth = () => {



    const params = useParams()

    // const [display, setDisplay] = useState(false);
    // const [disabled, setDisabled] = useState(false)
    const [shopData, setShopData] = useState('')
    const [carts, setCarts] = useState([])
    const [loading, setLoading] = useState(true)

    const isMounted = useRef()

    useEffect(() => {
        if(isMounted) {
            let localCart = localStorage.getItem("cart");
            const fetchDetails = async () => {
                try
                {
                    const docRef = doc(db, "shops", params.shopName)
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        //console.log("Document data:", docSnap.data());
                        setShopData(docSnap.data())
                        setLoading(false)

                    } else {
                        console.log("No such document!");
                    }
                }
                catch (error) {
                    console.log({error})
                }
            }
            fetchDetails()

            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) setCarts(localCart)
            //console.log(carts)
            //console.log(carts.length)


        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.shopName])




    return (
        <>
            {loading ?
                (<Spinner />)
                :
                (
                    <>
                        <ShopNavHeader cartCount={carts.length} businessUrl={params.shopName} />
                        <ShopHeader businessName={shopData.businessName} businessUrl={params.shopName} />
                        <CategorySection shopName={params.shopName}/>
                        <Container>
                            <div className="Auth-page">
                                <div className='bread-crumb'>
                                    <ul>
                                        <li>
                                            <Link to={ `/${params.shopName}`} className="bread-crumb-link"> Home</Link>
                                        </li> |
                                        <li>
                                            Account
                                        </li>
                                    </ul>
                                </div>
                                <Row className="justify-content-center">
                                    <Col md={6}>
                                        <div className="auth-tab">
                                            <ul>
                                                <li><h5 >Login</h5></li>
                                                <li><h5 className="not-active">Register</h5></li>
                                            </ul>
                                        </div>

                                        <div className="auth-login">
                                            <Form>
                                                <h5>Login</h5>
                                                <div className="form-group">
                                                    <div className="Input-box">
                                                        <label htmlFor="email">Email</label>
                                                        <input type="email"
                                                               id="email"
                                                               required={true}
                                                               className="form-control"
                                                               placeholder="Your Email"/>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="Input-box">
                                                        <label htmlFor="email">Password</label>
                                                        <input type="password"
                                                               id="password"
                                                               required={true}
                                                               className="form-control"
                                                               placeholder="Your Password"/>
                                                    </div>
                                                </div>

                                                <div className="form-group button">
                                                    <p>Forgot Password ?</p>
                                                    <Button className="btn btn-md btn-primary" type="submit">Login</Button>
                                                </div>

                                            </Form>

                                        </div>

                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <ShopFooter businessName={shopData.businessName}/>
                    </>
                )}

        </>

    )

}
export default ShopAuth
