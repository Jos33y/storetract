import {Col ,Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

const ShopNavHeader = ({businessUrl, cartCount}) => {
    return (
        <>
            <div className="Nav-header">
                <Row>
                    <Col md={6}>
                        <div className="Socials">
                            <ul>
                                <li>
                                    <Link to="https//" className="Socials-link">
                                        <i className="fab fa-facebook-f"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https//" className="Socials-link">
                                        <i className="fab fa-twitter"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https//" className="Socials-link">
                                        <i className="fab fa-instagram-square"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https//" className="Socials-link">
                                        <i className="fab fa-pinterest-square"></i>
                                    </Link>
                                </li>
                            </ul>

                        </div>

                    </Col>
                    <Col md={6}>
                        <div className="Account-nav">
                            <ul>
                                <li>
                                    <Link to="https://" className="Account-link">
                                        <i className="fas fa-home"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https://" className="Account-link">
                                        <i className="fas fa-search"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${businessUrl}/account`} className="Account-link">
                                        <i className="fas fa-user-alt"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${businessUrl}/cart`} className="Account-link">
                                        My Cart <i className="fas fa-shopping-cart"></i>
                                        <span className="cart-count">{cartCount ? (cartCount) : '0' } </span>
                                    </Link>
                                </li>
                            </ul>

                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )

}

export default ShopNavHeader
