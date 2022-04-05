import React from "react";
import {Col ,Container ,Row ,Table} from "react-bootstrap";
import {Link ,useNavigate ,useParams} from "react-router-dom";
import CheckOutHeader from "./CheckOutHeader";
import OrderSummary from "./OrderSummary";
import ShopFooter from "../components/ShopFooter";
import FlutterLogo from "../../assets/images/flutter-wave.png";
import PaystackLogo from "../../assets/images/paystack-logo-vector.png";
import KlumpLogo from "../../assets/images/klump-two-ng.PNG";
import {useFlutterwave, closePaymentModal} from "flutterwave-react-v3";
import {usePaystackPayment} from "react-paystack";
import {Helmet} from "react-helmet";

const CheckOutPayment = () => {
    const params = useParams()
    const navigate = useNavigate()


    // flutter wave payment section
    const flutter_config = {
        public_key: "FLWPUBK_TEST-44d817f412ee52d8daf7a5a67444b73c-X",
        tx_ref: 'sdssds',
        amount: 100,
        currency: 'NGN',
        payment_options: 'card, mobilemoney, banktransfer ,ussd',
        customer: {
            email: 'user@gmail.com',
            phonenumber: '070455666845',
            name: 'Johnson Enterprise',
        },
        customizations: {
            title: 'payment title',
            description: 'Payment fort items in cart',
            logo: 'https://i.ibb.co/Lh3dcSM/logo512.png',
        },
    };
    const handleFlutterPayment = useFlutterwave(flutter_config);


    // paystack payment config

    const paystack_config = {
        reference: (new Date()).getTime().toString(),
        email: "user@example.com",
        amount: 20000,
        publicKey:"pk_test_92373800d132af22fc873ce48794f7f6165d4ad3",
    };
    // you can call this function anything
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        navigate(`/${params.shopName}/checkout/order-confirmation`)
        console.log(reference);
    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }
    const initializePayment = usePaystackPayment(paystack_config);


    // useKlump
    //         const payload = {
    //         publicKey: "klp_pk_test_540b6dfd1e1a4ac1b234963e5fedb9d4cc90cafb97b94d5c93f72e61379dfb91",
    //         data: {
    //         amount: 4100,
    //         shipping_fee: 100,
    //         currency: 'NGN',
    //         merchant_reference: 'what-ever-you-want-this-to-be',
    //         meta_data: {
    //         customer: 'Elon Musk',
    //         email: 'musk@spacex.com'
    //     },
    //         items: [
    //     {
    //         image_url:
    //         'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //         item_url: 'https://www.paypal.com/in/webapps/mpp/home',
    //         name: 'Awesome item',
    //         unit_price: '2000',
    //         quantity: 2,
    //     }
    //         ]
    //     },
    //         onSuccess: (data) => {
    //         console.log('html onSuccess will be handled by the merchant');
    //         console.log(data);
    //         // ok = data;
    //         return data;
    //     },
    //         onError: (data) => {
    //         console.log('html onError will be handled by the merchant');
    //         console.log(data);
    //     },
    //         onLoad: (data) => {
    //         console.log('html onLoad will be handled by the merchant');
    //         console.log(data);
    //     },
    //         onOpen: (data) => {
    //         console.log('html OnOpen will be handled by the merchant');
    //         console.log(data);
    //     },
    //         onClose: (data) => {
    //         console.log('html onClose will be handled by the merchant');
    //         console.log(data);
    //     }
    //     }



    return (
        <>
            <Helmet>
                <script src="https://js.useklump.com/klump.js"
                        type="text/javascript" />
                <script>

                </script>
            </Helmet>
            <div className="Checkout">
                <Container>
                    <Row>
                        <Col md={7}>
                            <CheckOutHeader active="checkout-payment" />
                            <div className="Payment">
                                {/*shipping address*/}
                                <div className="Shipping-address">
                                    <Table className="table">
                                        <tbody>
                                        <tr className="top">
                                            <td><p className="text-head"> Contact</p></td>
                                            <td> <p>josephlagbalu@gmail.com </p></td>
                                            <td> <Link to="https://" className="link">Change</Link> </td>
                                        </tr>
                                        <tr>
                                            <td><p className="text-head"> Ship to</p></td>
                                            <td> <p>My QR KARD, 333 Fremont Street, San Francisco CA 94105, United States </p></td>
                                            <td> <Link to="https://" className="link">Change</Link> </td>
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
                                    <h5>Payment method</h5>
                                    <h6>All transactions are secure and encrypted.</h6>

                                    <div className="Payment-method-list">
                                        {/*paystack button*/}
                                        <h4
                                            onClick={() => {
                                                initializePayment(onSuccess, onClose)
                                            }}
                                            className="paystack">
                                            Pay with  <img src={PaystackLogo} alt="" className="img-fluid"/></h4>

                                        {/*flutter wave button*/}
                                        <h4 onClick={() => {
                                            handleFlutterPayment({
                                                callback: (response) => {
                                                    navigate(`/${params.shopName}/checkout/order-confirmation`)
                                                    console.log(response);
                                                    closePaymentModal() // this will close the modal programmatically
                                                },
                                                onClose: () => { navigate(`/${params.shopName}/checkout/order-confirmation`)},
                                            });
                                        }}>Pay with <img src={FlutterLogo} alt="" className="img-fluid"/></h4>
                                        {/* eslint-disable-next-line no-undef */}
                                        <h4  className="klump">Pay with <img src={KlumpLogo} alt="" className="img-fluid"/> <span className="small">(pay installmentally using klump) </span> </h4>
                                        {/*onClick={() => {const Klump = new Klump(payload);}}*/}
                                    </div>

                                </div>

                                {/*buttons section*/}
                                <div className="form-group">
                                    <Row>
                                        <Col md={4}>

                                        </Col>
                                        <Col md={4}>
                                            <p><Link to={(`/${params.shopName}/checkout/shipping`)} className="link"> Return to Shipping</Link></p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col md={5}>
                            <OrderSummary/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <ShopFooter businessName="Johnson Enterprises" />
        </>
    )

}

export default CheckOutPayment
