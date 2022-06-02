import React from "react";
import "../css/shopHeader.css"
import {Col, Row} from "react-bootstrap";

const ShopFooter = ({shopData}) => {
    return(
        <>
            <div className="Store-footer">
                <div className="container-fluid">
                    <Row>
                        <Col md={3}>
                            <h5>Address</h5>
                            <p>{`${shopData.storeLocation ? (shopData.storeLocation + ' State,') : ''} Nigeria`}</p>
                        </Col>

                        <Col md={3}>
                            <h5>Contacts</h5>
                            <a href={`tel:+234${shopData.businessPhone}`} className="link"> {shopData.businessPhone} </a><br/>
                            <a href={`mailto:${shopData.businessEmail}`} className="link"> {shopData.businessEmail} </a>
                        </Col>

                        <Col md={3}>
                            <div className="connect">
                                <h5>Connect with us</h5>
                                <ul>
                                    {shopData.facebookUrl ? (
                                        <li>
                                        <a href={`${shopData.facebookUrl}`} className="Socials-link">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    ) : ''}

                                    {shopData.twitterUrl ? (
                                        <li>
                                            <a href={`${shopData.twitterUrl}`} className="Socials-link">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        </li>
                                    ) : ''}

                                    {shopData.instagramUrl ? (
                                        <li>
                                            <a href={`${shopData.instagramUrl}`} className="Socials-link">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        </li>
                                    ) : ''}

                                </ul>
                            </div>
                        </Col>
                        <Col md={3}>
                            <br/>
                            <br/>
                            <p className="footer-note">{shopData.businessName} &copy; 2022</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )

}

export default ShopFooter


