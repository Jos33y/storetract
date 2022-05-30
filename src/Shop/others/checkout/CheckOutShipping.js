import {Button ,Col ,Container ,Row ,Table} from "react-bootstrap";
import {Link ,useNavigate ,useParams} from "react-router-dom";
import CheckOutHeader from "./CheckOutHeader";
import OrderSummary from "./OrderSummary";
import ShopFooter from "../../components/ShopFooter";
import React, {useEffect ,useRef ,useState} from "react";
import {doc ,getDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import Spinner from "../../components/Spinner";

const CheckOutShipping = () => {
    // const [carts, setCarts] = useState([])
    // const [customerID, setCustomerID] = useState("")
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState([])

    const params = useParams()
    const navigate = useNavigate()
    const isMounted = useRef()

    const handleShipping = () => {
        console.log("Handling Information")
        navigate(`/${params.shopName}/checkout/payment`)
    }

    const getCustomer = async (CustomerID) =>{

        try {
            const customerRef = doc(db, 'shops', params.shopName, 'customers', CustomerID)
            const customerSnap =  await getDoc(customerRef)

            if(customerSnap.exists()){
                // console.log(customerSnap.data())
                setFormData(customerSnap.data())
                setLoading(false)
            }

        }
        catch (e) {
            console.log({e})
        }

    }

    useEffect(() => {
        if(isMounted) {
            let localCustomerID = localStorage.getItem("customerID");
            // let localCart = localStorage.getItem("cart");


            localCustomerID = JSON.parse(localCustomerID);
            //load persisted cart into state if it exists
            if (localCustomerID) {
                // setCustomerID(localCustomerID)
                getCustomer(localCustomerID)
            }



            // //turn it into js
            // localCart = JSON.parse(localCart);
            // //load persisted cart into state if it exists
            // if (localCart) {
            //     setCarts(localCart)
            //     // console.log(carts)
            // }



        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.shopName])



    return (
        <>
            { loading ?
                (<Spinner/>) :

                (
                    <>
            <div className="Checkout">
                <Container>
                    <Row>
                        <Col md={7}>
                            <CheckOutHeader active="checkout-shipping" />
                            <div className="Shipping">
                                {/*shipping address*/}
                                <div className="Shipping-address">
                                    <Table className="table">
                                        <tbody>
                                        <tr className="top">
                                            <td><p className="text-head"> Contact</p></td>
                                            <td> <p>{formData.email} </p></td>
                                            <td> <Link to={(`/${params.shopName}/checkout/information`)} className="link">Change</Link> </td>
                                        </tr>
                                        <tr>
                                            <td><p className="text-head"> Ship to</p></td>
                                            <td> <p>{`${formData.deliveryAddress}, ${formData.city}, ${formData.state}, ${formData.country}`} </p></td>
                                            <td> <Link to={(`/${params.shopName}/checkout/information`)} className="link">Change</Link> </td>
                                        </tr>
                                        </tbody>
                                    </Table>

                                </div>

                                {/*shipping method*/}
                                <div className="Shipping-method">
                                    <h6>Shipping method</h6>
                                    <Table className="table">
                                        <tbody className="Shipping-method-table">
                                            <tr>
                                                <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                FREE DHL Express Recorded delivery + taxes paid
                                                            </label>
                                                    </div>
                                                </td>
                                                <td> <p>Free</p> </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                               id="flexRadioDefault2" checked/>
                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                                Delivery within Lagos
                                                            </label>
                                                    </div>
                                                </td>
                                                <td> <p> &#8358;1,500</p> </td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                </div>

                                {/*buttons section*/}
                                <div className="form-group">
                                    <Row>
                                        <Col md={4}>
                                            <Button className="btn btn-md btn-primary" onClick={handleShipping}> Continue to payment</Button>
                                        </Col>
                                        <Col md={4}>
                                            <p><Link to={(`/${params.shopName}/checkout/information`)} className="link"> Return to information</Link></p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col md={5}>
                            <OrderSummary />
                        </Col>
                    </Row>
                </Container>
            </div>
            <ShopFooter businessName="Johnson Enterprises" />
                    </>
                )
            }

        </>
    )

}

export default CheckOutShipping
