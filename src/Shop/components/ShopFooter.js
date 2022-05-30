import React from "react";
import {Link} from "react-router-dom";
import "../css/shopHeader.css"
import {Col, Row} from "react-bootstrap";

const ShopFooter = ({businessName}) => {
    return(
        <>
            <div className="Store-footer">
                <div className="container-fluid">
                    <Row>
                        <Col md={3}>
                            <h5>Address</h5>
                            <p>3721 Single Street</p>
                            <p>Quincy, MA 02169</p>
                        </Col>

                        <Col md={3}>
                            <h5>Contacts</h5>
                            <p>867-345-9802</p>
                            <p>info@tixly.com</p>
                        </Col>

                        <Col md={3}>
                            <div className="connect">
                                <h5>Connect with us</h5>
                                <ul>
                                    <li>
                                        <Link to="https://" className="Socials-link">
                                            <i className="fab fa-facebook-f"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://" className="Socials-link">
                                            <i className="fab fa-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://" className="Socials-link">
                                            <i className="fab fa-instagram"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://" className="Socials-link">
                                            <i className="fab fa-pinterest"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col md={3}>
                            <br/>
                            <br/>
                            <p className="footer-note">{businessName} &copy; 2022</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )

}

export default ShopFooter


