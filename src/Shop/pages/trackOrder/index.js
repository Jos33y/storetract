import React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const TrackOrder = () => {

    return (
        <>
            <div className="Tracking-order">
            <div className="bread-crumb">
                <ul>
                    <li>Home</li>
                    |
                    <li>Tracking</li>
                </ul>
            </div>

            <Container>
                <Row>
                    <Col lg={9}>
                        <div className="Tracking-order-text">
                            <p>To track your order please enter your Order ID in the box below and press the "Track" button.
                                This was given to you on your receipt and in the confirmation email you should have received.</p>
                        <Form>
                            <div className="form-group">
                                <label htmlFor="orderId" hidden={true}>order id</label>
                                <input type="text"
                                       id="orderId"
                                       required={true}
                                       className="form-control"
                                       placeholder="Order ID"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" hidden={true}>Billing Email Address</label>
                                <input type="email"
                                       id="email"
                                       required={true}
                                       className="form-control"
                                       placeholder="Billing Email Address"/>
                            </div>

                            <div className="form-group button">
                                <Button className="btn btn-md btn-primary"
                                        type="submit">Track Order</Button>
                            </div>
                        </Form>
                        </div>
                    </Col>
                </Row>

            </Container>
            </div>
        </>
    )
}
export default TrackOrder