import React from "react";
import {Link} from "react-router-dom";
import "../css/shopHeader.css"
import {Col, Container, Row} from "react-bootstrap";

const ShopFooter = ({businessName}) => {
    return(
        <>
            {/*<div className="Footer">*/}
            {/*    <p> {businessName} &copy; 2022</p>*/}
            {/*    */}
            {/*</div>*/}

            <div className="Footer-two">
                <div className="Top-section">
                    <Container>

                            <Row>
                                <Col md={3}>
                                    <h5>Payment</h5>
                                    <ul className="Payment-list">
                                        <li>Wallet</li>
                                        <li>Verve</li>
                                        <li>Visa</li>
                                        <li>Mastercard</li>
                                    </ul>
                                </Col>

                                <Col md={5}>
                                    <div className="Whatsapp">
                                        <div className="Whatsapp-font">
                                            <i className="fab fa-whatsapp"></i>
                                        </div>
                                        <div className="Whatsapp-text">
                                            <h5>WhatsApp</h5>
                                            <p> 08175642265, 0917478822</p>
                                        </div>
                                    </div>
                                </Col>

                                <Col md={4}>
                                    <div className="connect">
                                        <h5>Connect with US</h5>
                                        <div className="Socials">
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
                                    </div>
                                </Col>
                            </Row>
                    </Container>
                </div>

                <div className="Bottom-section">
                    <p className="footer-note">{businessName} &copy; 2022</p>
                </div>

            </div>
        </>
    )

}

export default ShopFooter


