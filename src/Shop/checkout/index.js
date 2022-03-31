import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import "./Styles.css"
import OrderSummary from "./OrderSummary";
import CheckOutHeader from "./CheckOutHeader";
import ShopFooter from "../components/ShopFooter";
import {Link ,useParams} from "react-router-dom";



const CheckOutInformation = () => {

    const params = useParams()

    const handleInfo = () => {
        console.log("Handling Information")
    }


    return (
        <>
            <div className="Checkout">
                <Container>
                    <Row>
                        <Col md={7}>
                            <CheckOutHeader active="checkout-info" />

                            <div className="Checkout-information">
                                <Form>
                                    <h6>Contact Information</h6>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Email"/>
                                    </div>

                                    <h6>Shipping Address </h6>
                                    <div className="form-group">
                                        <Row>
                                            <Col md={6}>
                                                <input type="text" className="form-control" placeholder="First Name"/>
                                            </Col>
                                            <Col md={6}>
                                                <input type="text" className="form-control" placeholder="Last Name"/>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="form-group">
                                        <select name="country" className="form-control" id=""  placeholder="Select a country">
                                            <option value="" disabled={true} selected>Select Country</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <Row>
                                            <Col md={6}>
                                                <select name="state" className="form-control" id="">
                                                    <option value="" disabled={true} selected>Select State</option>
                                                </select>
                                            </Col>
                                            <Col md={6}>
                                                <select name="state" className="form-control" id="">
                                                    <option value="" disabled={true} selected >Select City</option>
                                                </select>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Delivery Address"/>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Phone Number"/>
                                    </div>
                                    <div className="form-group">
                                        <textarea name="delivery-note" className="form-control" id="note" cols="30" rows="4" placeholder="delivery note"></textarea>
                                    </div>

                                    <div className="form-group">
                                        <Row>
                                            <Col md={4}>
                                                <Button className="btn btn-md btn-primary" onClick={handleInfo}> Continue to Shipping</Button>
                                            </Col>
                                            <Col md={4}>
                                                <p><Link to={(`/${params.shopName}/checkout/shipping`)} className="link"> Return to Cart</Link></p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>

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
export default CheckOutInformation
