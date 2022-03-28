import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import React from "react";

const ShopAuth = () => {

    return (
        <>
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="account-tab">
                            <ul>
                                <li><h5>Login</h5></li>
                                <li><h5>Register</h5></li>
                            </ul>
                        </div>

                        <div className="account-login">
                            <Form>
                                <h5>Login</h5>
                                <div className="form-group">
                                    <div className="Input-box">
                                        <label htmlFor="email">Email</label>
                                        <input type="email"
                                               id="email"
                                               required={true}
                                               placeholder="Your Email"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="Input-box">
                                        <label htmlFor="email">Password</label>
                                        <input type="password"
                                               id="password"
                                               required={true}
                                               placeholder="Your Password"/>
                                    </div>
                                </div>

                                <div className="form-group button">
                                    <p>Forgot Password ?</p>
                                    <Button className="btn btn-md btn-primary" type="submit">Login</Button>
                                </div>

                            </Form>

                        </div>

                    </Col>
                </Row>
            </Container>
        </>

    )

}
export default ShopAuth
