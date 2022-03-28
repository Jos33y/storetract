import {Col ,Container ,Form ,Row} from "react-bootstrap";
import React from "react";

const ShopLogin = () => {

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
                                        <label htmlFor="email"><i className="fas fa-envelope"></i></label>
                                        <input type="email"
                                               id="email"
                                               value={email}
                                               onChange={onChange}
                                               required={true}
                                               placeholder="Your Email"/>
                                    </div>

                                </div>

                            </Form>

                        </div>

                    </Col>
                </Row>
            </Container>
        </>

    )

}
export default ShopLogin
