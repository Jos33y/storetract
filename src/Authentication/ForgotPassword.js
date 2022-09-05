import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import ForgotPasswordI from "../assets/images/3293465.jpg";

const ForgotPassword = () => {

    const onSubmit = async (e) => {
        e.preventDefault()
    }
    return(
        <>
            <HomeNavbar />
            <Container>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10} className="Auth-box">
                        <Row>
                            <Col md={6}>
                                <div className="Form-forgot">
                                    <img src={ForgotPasswordI} alt="" className="img-fluid"/>
                                    <p> <Link to="/login" className="register">I have a store</Link> </p>

                                </div>
                            </Col>
                            <Col md={6}>
                                <Form className="Form" onSubmit={onSubmit} autoComplete="off">
                                    <h5>Reset Password</h5>

                                    <div className="form-group">
                                        <div className="Input-box">
                                            <label htmlFor="email"><i className="fas fa-envelope"></i></label>
                                            <input type="email"
                                                   id="email"
                                                   required={true}
                                                   placeholder="Your Email"/>
                                        </div>

                                    </div>

                                    <div className="form-group button">
                                        <Button className="btn btn-md btn-primary" type="submit">Reset </Button>
                                    </div>

                                </Form>
                            </Col>


                        </Row>
                    </Col>
                    <Col md={1}></Col>
                </Row>

            </Container>

        </>
    )

}

export default ForgotPassword
