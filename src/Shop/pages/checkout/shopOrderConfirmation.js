import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import OrderSummary from "./orderSummary";
import {useReactToPrint} from "react-to-print";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import Spinner from "../../components/Spinner";

const ShopOrderConfirmation = ({businessUrl}) => {

    // const params = useParams()
    const navigate = useNavigate()
    const isMounted = useRef()
    const componentRef = useRef();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const [customerID, setCustomerID] = useState("")
    const [orderUniqueID, setOrderUniqueID] = useState("")
    const [formData, setFormData] = useState('')
    const [carts, setCarts] = useState([])
    const [paymentMethod, setPaymentMethod] = useState('')
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const [loading, setLoading] = useState(false);

    // handle printing of receipt
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // get customer information using customer ID
    const getCustomer = async (CustomerID) =>{
        setLoading(true)
        try {
            const customerRef = doc(db, 'shops', `${businessUrl}`, 'customers', CustomerID)
            const customerSnap =  await getDoc(customerRef)

            if(customerSnap.exists()){
                // console.log(customerSnap.data())
                setFormData(customerSnap.data())
            }
        }
        catch (e) {
            console.log({e})
        }
        setLoading(false)
    }

    // useEffect functions containing add form data to session storage
    useEffect(() => {
        if(isMounted) {
            let localCustomerID = localStorage.getItem("customerID");
            let localCart = localStorage.getItem("cart");
            let localPayment = localStorage.getItem("paymentMethod");
            let localOrderID = localStorage.getItem("orderUniqueID");

            // customer ID session
            localCustomerID = JSON.parse(localCustomerID);
            //load persisted cart into state if it exists
            if (localCustomerID) {
                getCustomer(localCustomerID)
                console.log(localCustomerID)
            }

            // orderID ID session
            localOrderID= JSON.parse(localOrderID);
            //load persisted cart into state if it exists
            if (localOrderID) {
                setOrderUniqueID(localOrderID)
            }

            // cart session
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) {
                setCarts(localCart)
                // console.log(carts)
            }

            // payment method session
            localPayment = JSON.parse(localPayment);
            //load persisted cart into state if it exists
            if (localCart) {
                setPaymentMethod(localPayment)
                console.log(paymentMethod)
            }
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, businessUrl])

    const continueShopping = () => {
        try {
            localStorage.removeItem("cart")
            localStorage.removeItem("orderUniqueID");
            localStorage.removeItem("paymentMethod")
        }
        catch (e) {
            console.log({e})
        }
        navigate(`/`)
    }

    const trackOrder = () => {
        try {
            localStorage.removeItem("cart")
            localStorage.removeItem("orderUniqueID");
            localStorage.removeItem("paymentMethod")
        }
        catch (e) {
            console.log({e})
        }
        navigate(`/track-order`)
    }

    return(
        <>
            { loading ?
                (<Spinner/>) :

                (
            <Container>
                <div className="Shop-Checkout">
                    {/*--------------bread crumbs section-----------------------*/}
                    <div className='bread-crumb'>
                        <ul>
                            <li>
                                <Link  to={(`/cart`)} className="bread-crumb-link"> Cart</Link>
                            </li>
                            <i className="fas fa-chevron-right"></i>
                            <li>
                                <span className='link'> Information</span>
                            </li>
                            <i className="fas fa-chevron-right"></i>
                            <li>
                                <span className='link'> Payment</span>
                            </li>
                            <i className="fas fa-chevron-right" ></i>
                            <li>
                                <span className='active'> Order Confirmation</span>
                            </li>

                        </ul>
                    </div>
                    {/*--------------main section-----------------------*/}
                    <div className="Shop-section-wrapper">
                        <Row>
                            {/*--------------order confirmation section-----------------------*/}
                            <Col md={7} ref={componentRef}>
                                <div className="Order-confirmation">
                                    {/*shipping address*/}
                                    <div className="Thank-you">
                                        <i className="far fa-check-circle"></i>
                                        <div className="text">
                                            <h6>Order ID:  #{orderUniqueID}</h6>
                                            <h4>Thank you {formData.lastname}! </h4>
                                        </div>
                                    </div>

                                    {/*order information*/}
                                    <div className="order-box">
                                        <Table className="table">
                                            <thead>
                                            <tr>
                                                <th className="th-product">Product </th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Price</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {carts.map((cart) => (
                                            <tr  key={cart.id} >
                                                <td >
                                                    <p className="title"> {cart.productName} </p>
                                                </td>
                                                <td>
                                                    <p className="amount">&#8358;{(cart.productPrice).toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                                </td>
                                                <td><p>{cart.qty}</p></td>
                                                <td>
                                                    <p className="amount">&#8358;{(cart.productPrice * cart.qty).toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                                </td>
                                            </tr>
                                            ))}
                                            {/*subtotal section*/}
                                            <tr className="Sub-total">
                                                <td colSpan={4}>
                                                    <ul>
                                                        <li>Subtotal <span className="price money">&#8358;{(itemsPrice).toFixed(2).toString()
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>  </li>
                                                        <li>Shipping <span className="price"> Calculated at next steps</span></li>
                                                    </ul>
                                                </td>
                                            </tr>

                                            {/*total section*/}
                                            <tr className="Total-section">
                                                <td colSpan={4}>
                                                    <p className="total">Total <span className="total-price">&#8358;{(itemsPrice).toFixed(2).toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></p>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>


                                    {/*order updates*/}
                                    <div className="Order-updates order-box">
                                        <h4>Order updates</h4>
                                        <p> You’ll get shipping and delivery updates by email.</p>
                                        <button  onClick={trackOrder} className="btn btn-md btn-primary"><i className="fas fa-truck"></i>  track orders</button>

                                        <button className="btn btn-md btn-success" onClick={handlePrint}>
                                            <i className="fas fa-file-pdf"></i> Print Receipt
                                        </button>
                                    </div>


                                    {/*contact information box*/}
                                    <div className="Contact-info order-box">
                                        <h4>Customer Information</h4>
                                        <Row>
                                            <Col md={6}>
                                                <h5>Contact information</h5>
                                                <p>{formData.email}</p>
                                            </Col>
                                            <Col md={6}>
                                                <h5>Payment method</h5>
                                                <p>{paymentMethod ? paymentMethod : 'PayStack'} - &#8358;{(itemsPrice).toFixed(2).toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <h5>Shipping address</h5>
                                                <p>Joseph Lagbalu
                                                    <br/>
                                                    {formData.deliveryAddress}
                                                    <br/>
                                                    {formData.city} {formData.state}
                                                    <br/>
                                                    {formData.country}
                                                    <br/>
                                                    {formData.phoneNumber}</p>
                                            </Col>
                                            <Col md={6}>
                                                <h5>Shipping method</h5>
                                                <p>FREE DHL Express Recorded delivery + taxes paid</p>
                                            </Col>
                                        </Row>
                                    </div>



                                    {/*buttons section*/}
                                    <div className="form-group buttons">
                                        <Row>
                                            <Col md={4}>
                                                <Button className="btn btn-md btn-primary" onClick={continueShopping}> Continue Shopping</Button>
                                            </Col>
                                            <Col md={4}>
                                                <p><Link to="https://" className="link"> Need help ? Contact us</Link></p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>

                            {/*--------------order summary section-----------------------*/}
                            <Col md={5}>
                                <OrderSummary confirm={true} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
                )
            }
        </>
    )

}

export default ShopOrderConfirmation;