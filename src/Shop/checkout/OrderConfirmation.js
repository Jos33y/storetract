import {Button ,Col ,Container ,Row ,Table} from "react-bootstrap";
import {Link ,useNavigate ,useParams} from "react-router-dom";
import React from "react";
import OrderSummary from "./OrderSummary";
import ShopFooter from "../components/ShopFooter";
import CheckOutHeader from "./CheckOutHeader";


const OrderConfirmation = () => {

    const params = useParams()
    const navigate = useNavigate()


    const continueShopping = () => {

        console.log("Handling Information")
        navigate(`/${params.shopName}`)
    }
    return (
        <>
            <div className="Checkout">
                <Container>
                    <Row>
                        <Col md={7}>
                            <CheckOutHeader active="checkout-confirm" />
                            <div className="Order-confirmation">
                                {/*shipping address*/}
                                <div className="Thank-you">
                                    <i className="far fa-check-circle"></i>
                                    <div className="text">
                                        <h6>Order ID:  #19197</h6>
                                        <h4>Thank you Joseph! </h4>
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
                                        <tr>
                                            <td >
                                                <p className="title"> UNCONDITIONAL Black cashmere mix mink collared single breasted coat</p>
                                            </td>
                                            <td>
                                                <p className="amount">&#8358;3000</p>
                                            </td>
                                            <td><p> 1</p></td>
                                            <td>
                                                <p className="amount">&#8358;3000</p>
                                            </td>
                                        </tr>
                                        {/*subtotal section*/}
                                        <tr className="Sub-total">
                                            <td colSpan={4}>
                                                <ul>
                                                    <li>Subtotal <span className="price money">&#8358;3000</span>  </li>
                                                    <li>Shipping <span className="price"> Calculated at next steps</span></li>
                                                </ul>
                                            </td>
                                        </tr>

                                        {/*total section*/}
                                        <tr className="Total-section">
                                            <td colSpan={4}>
                                                <p className="total">Total <span className="total-price">&#8358; 6000 </span></p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div>


                                {/*order updates*/}
                                <div className="Order-updates order-box">
                                    <h4>Order updates</h4>
                                    <p> You’ll get shipping and delivery updates by email.</p>
                                    <Link to="https://" className="btn btn-md btn-primary"><i className="fas fa-truck"></i>  track orders</Link>

                                    {/*<button className="btn btn-md btn-success"><i className="fas fa-file-pdf"> Print Receipt</i> </button>*/}
                                </div>


                                {/*contact information box*/}
                                <div className="Contact-info order-box">
                                    <h4>Customer Information</h4>
                                   <Row>
                                       <Col md={6}>
                                           <h5>Contact information</h5>
                                           <p>josephlagbalu@gmail.com</p>
                                       </Col>
                                       <Col md={6}>
                                           <h5>Payment method</h5>
                                           <p>PAYSTACK - &#8358;6,000</p>
                                       </Col>
                                   </Row>

                                    <Row>
                                        <Col md={6}>
                                            <h5>Shipping address</h5>
                                            <p>Joseph Lagbalu
                                                <br/>
                                                My QR KARD
                                                <br/>
                                                333 Fremont Street
                                                <br/>
                                                San Francisco CA 94105
                                                <br/>
                                                United States
                                                <br/>
                                                +2347037344408</p>
                                        </Col>
                                        <Col md={6}>
                                            <h5>Shipping method</h5>
                                            <p>FREE DHL Express Recorded delivery + taxes paid</p>
                                        </Col>
                                    </Row>
                                </div>



                                {/*buttons section*/}
                                <div className="form-group">
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
                        <Col md={5}>
                            <OrderSummary confirm={true} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <ShopFooter businessName="Johnson Enterprises" />
        </>
    )

}

export default OrderConfirmation
