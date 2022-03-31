import {Button ,Col ,Container ,Row ,Table} from "react-bootstrap";
import {Link ,useParams} from "react-router-dom";
import {useState} from "react";
import CheckOutHeader from "./CheckOutHeader";
import OrderSummary from "./OrderSummary";
import ShopFooter from "../components/ShopFooter";

const CheckOutPayment = () => {
    const params = useParams()

    const [paystack, setPaystack] = useState(true)
    const [flutterWave, setFlutterWave] = useState(false)
    const [klump, setKlump] = useState(false)

    const handleShipping = () => {
        console.log("Handling Information")
    }

    const handlePayment = (payment) => {

        if (payment === "paystack"){
            setPaystack(true)
            setFlutterWave(false)
            setKlump(false)

        }
        else  if (payment === "flutterWave"){
            setFlutterWave(true)
            setPaystack(false)
            setKlump(false)
        }
        else{
            setKlump(true)
            setFlutterWave(false)
            setPaystack(false)

        }
    }

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
                                        <h4 onClick={() => handlePayment("paystack")} className={paystack ? ("active") : ("")}>Pay with Paystack</h4>
                                        <h4 onClick={() => handlePayment("flutterWave")} className={flutterWave ? ("active") : ("")}>Pay with FlutterWave</h4>
                                        <h4 onClick={() => handlePayment("klump")} className={klump ? ("active") : ("")}>Pay with Klump <span className="small">(pay installmentally using klump) </span> </h4>
                                    </div>

                                </div>

                                {/*buttons section*/}
                                <div className="form-group">
                                    <Row>
                                        <Col md={4}>
                                            <Button className="btn btn-md btn-primary" onClick={handleShipping}> Pay Now</Button>
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
