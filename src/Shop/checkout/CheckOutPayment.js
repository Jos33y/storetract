import {Col ,Container ,Row ,Table} from "react-bootstrap";
import {Link ,useParams} from "react-router-dom";
import CheckOutHeader from "./CheckOutHeader";
import OrderSummary from "./OrderSummary";
import ShopFooter from "../components/ShopFooter";
import FlutterLogo from "../../assets/images/flutter-wave.png";
import PaystackLogo from "../../assets/images/paystack-logo-vector.png";
import KlumpLogo from "../../assets/images/klump-two-ng.PNG";
import {useFlutterwave, closePaymentModal} from "flutterwave-react-v3";
import {usePaystackPayment} from "react-paystack";

const CheckOutPayment = () => {
    const params = useParams()


    // flutter wave payment section
    const flutter_config = {
        public_key: process.env.FLUTTERWAVE_PUBLIC_TEST_KEY,
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
        publicKey: process.env.PAYSTACK_PUBLIC_TEST_KEY,
    };
    // you can call this function anything
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }
    const initializePayment = usePaystackPayment(paystack_config);


    return (
        <>
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
                                                    console.log(response);
                                                    closePaymentModal() // this will close the modal programmatically
                                                },
                                                onClose: () => {},
                                            });
                                        }}>Pay with <img src={FlutterLogo} alt="" className="img-fluid"/></h4>
                                        <h4 className="klump">Pay with <img src={KlumpLogo} alt="" className="img-fluid"/> <span className="small">(pay installmentally using klump) </span> </h4>
                                    </div>

                                </div>

                                {/*buttons section*/}
                                <div className="form-group">
                                    <Row>
                                        <Col md={4}>

                                        </Col>
                                        <Col md={4}>
                                            <p><Link to={(`/${params.shopName}/checkout/order-confirmation`)} className="link"> Return to Shipping</Link></p>
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

export default CheckOutPayment
