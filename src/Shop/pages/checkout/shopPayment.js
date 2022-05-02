import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import OrderSummary from "./orderSummary";
import React, {useState} from "react";
import PaystackLogo from "../../../assets/images/paystack-logo-vector.png";
import KlumpLogo from "../../../assets/images/klump-two-ng.PNG";
import AcceptedPayment from "../../../assets/images/shopimages/cards-501x173.png";
import {toast} from "react-toastify";
import {usePaystackPayment} from "react-paystack";

const ShopPayment = ({businessUrl}) => {

    const params = useParams()
    const navigate = useNavigate()

    const [displayP, setDisplayP] = useState(false);
    const [displayK, setDisplayK] = useState(false);
    const [payMethod, setPayMethod] = useState("not selected");

    // paystack payment config

    const paystack_config = {
        reference: (new Date()).getTime().toString(),
        email: "user@example.com",
        amount: (20000 * 100),
        publicKey:"pk_test_92373800d132af22fc873ce48794f7f6165d4ad3",
    };
    // you can call this function anything
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        toast.success("Payment successful");
        navigate(`/${params.shopName}/checkout/order-confirmation`)
        console.log(reference);
    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        toast.error("Payment window closed");
    }
    const initializePayment = usePaystackPayment(paystack_config);


    const activePaystack = () => {
        if(displayP) {
            if(!displayK){
                setDisplayK(true)
                setPayMethod("useKlump")
            }
            setDisplayP(false)
        }
        else {
            if(displayK){
                setDisplayK(false)
            }
            setDisplayP(true)
            setPayMethod("payStack")
        }
    }

    const activeKlump = () => {

        if(displayK) {
            if(!displayP){
                setDisplayP(true)
                setPayMethod("payStack")
            }
            setDisplayK(false)
        }
        else {
            if(displayP){
                setDisplayP(false)
            }
            setDisplayK(true)
            setPayMethod("useKlump")
        }
    }

    const makePayment = () => {
        if(payMethod === 'not selected') {
            toast.error("Select a payment method");
        }
        else if(payMethod === "useKlump") {
            toast.success("useKlump coming soon");
        }
        else if(payMethod === "payStack") {
            initializePayment(onSuccess, onClose)
        }
        else {
            toast.error("Select a payment method");
        }

    }
    return(
        <>
            <Container>
                <div className="Shop-Checkout">
                    {/*--------------bread crumbs section-----------------------*/}
                    <div className='bread-crumb'>
                        <ul>
                            <li>
                                <Link  to={(`/${businessUrl}/cart`)} className="bread-crumb-link"> Cart</Link>
                            </li>
                            <i className="fas fa-chevron-right"></i>
                            <li>
                                <Link  to={(`/${businessUrl}/checkout/information`)} className="bread-crumb-link"> Information</Link>
                            </li>
                            <i className="fas fa-chevron-right"></i>
                            <li>
                                <span className='active'> Payment</span>
                            </li>
                            <i className="fas fa-chevron-right" ></i>
                            <li>
                                <span className='link'> Order Confirmation</span>
                            </li>

                        </ul>
                    </div>

                    {/*--------------main section-----------------------*/}
                    <div className="Shop-section-wrapper">
                        <Row>
                            {/*--------------payment section-----------------------*/}
                            <Col md={7}>
                                <h5 className="title">Checkout </h5>
                                    {/*shipping address*/}
                                    <div className="Shipping-address">
                                        <Table className="table">
                                            <tbody>
                                            <tr className="top">
                                                <td><p className="text-head"> Contact</p></td>
                                                <td> <p>josephlagbalu@gmail.com </p></td>
                                                <td> <Link to={(`/${businessUrl}/checkout/information`)} className="link">Change</Link> </td>
                                            </tr>
                                            <tr>
                                                <td><p className="text-head"> Ship to</p></td>
                                                <td> <p>My QR KARD, 333 Fremont Street, San Francisco CA 94105, United States </p></td>
                                                <td> <Link to={(`/${businessUrl}/checkout/information`)} className="link">Change</Link> </td>
                                            </tr>
                                            <tr>
                                                <td><p className="text-head"> Method</p></td>
                                                <td colSpan={2}> <p>FREE DHL Express Recorded delivery + taxes paid · Free </p></td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>

                                    <div className="Shipping-address Sub-total">
                                        <Table className="table">
                                            <tbody>
                                            <tr className="top">
                                                <td colSpan={2}><p className="text-head"> Sub total</p></td>
                                                <td> <p className="left"> &#8358; 6,000</p> </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}><p className="text-head"> Shipping</p></td>
                                                <td> <p className="left">Free</p> </td>
                                            </tr>
                                            <tr className="total">
                                                <td colSpan={2}><p className="text-head"> Total</p></td>
                                                <td> <p className="left">&#8358; 6,000</p> </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>

                                    {/*shipping method*/}
                                    <div className="Payment-method">
                                        <h6 className="sub-title">Payment Method</h6>
                                        <h6 className="note">Choose your preferred payment method.</h6>

                                        <div className="Payment-method-list">
                                            <Row>
                                                <Col md={6}>
                                                    {/*paystack button*/}
                                                    <div className="Payment-box" onClick={activePaystack}>
                                                        <h5>
                                                            <span className="text">PayStack</span>
                                                            <img src={PaystackLogo} alt="" className="img-pay"/>
                                                        </h5>
                                                        {displayP && (
                                                            <>
                                                                <p>
                                                                    You will be redirected to our secure payment checkout.
                                                                </p>
                                                                <div className="payment-img">
                                                                    <img src={AcceptedPayment} alt="" className="img-fluid"/>
                                                                </div>
                                                            </> ) }
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    {/*paystack button*/}
                                                    <div className="Payment-box klump" onClick={activeKlump}>
                                                        <h5>
                                                            <span className="text">useKlump</span>
                                                            <img src={KlumpLogo} alt="" className="img-pay"/>
                                                        </h5>
                                                        {displayK && (
                                                            <>
                                                                <p>
                                                                    Klump helps you buy anything you need on a payment plan that works for you. <br/>
                                                                    Spread payments over 3 months after an initial 25% deposit.
                                                                </p>
                                                            </> ) }
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                    </div>

                                    {/*buttons section*/}
                                    <div className="form-group buttons">
                                        <Row>
                                            <Col md={ 4 }>
                                                <Button className="btn btn-md btn-primary" onClick={makePayment}> Make Payment </Button>
                                            </Col>
                                            <Col md={4}>
                                                <p><Link to={(`/${businessUrl}/checkout/information`)} className="link"> Return to Shipping</Link></p>
                                            </Col>

                                        </Row>
                                    </div>
                            </Col>

                            {/*--------------order summary section-----------------------*/}
                            <Col md={5}>
                                <OrderSummary confirm={false} />
                            </Col>
                        </Row>
                    </div>
                </div>

            </Container>
        </>
    )

}

export default ShopPayment