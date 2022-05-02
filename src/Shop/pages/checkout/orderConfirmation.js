import {Link} from "react-router-dom";
import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import OrderSummary from "./orderSummary";

const ShopOrderConfirmation = ({businessUrl}) => {

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
                            <Col md={7}>
                                <h5 className="title">Order Confirmation </h5>
                            </Col>

                            {/*--------------order summary section-----------------------*/}
                            <Col md={5}>
                                <OrderSummary confirm={true} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </>
    )

}

export default ShopOrderConfirmation;