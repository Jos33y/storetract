import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const ForgotPassword = () => {

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log("Forgot Password Working")
    }
    return(
        <>
            <HomeNavbar />
            <Container>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Form className="Form" onSubmit={onSubmit}>
                            <h5>Forgot Password</h5>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                       id="email"
                                       className="form-control"
                                       placeholder="Enter Email Address"/>
                            </div>
                            <div className="form-group button">
                                <Button className="btn btn-md btn-primary" type="submit">Reset Password</Button>
                            </div>

                            <p> <Link to="/login" className="forget">Login</Link> </p>
                        </Form>
                    </Col>
                    <Col md={4}></Col>

                </Row>
            </Container>

        </>
    )

}

export default ForgotPassword
