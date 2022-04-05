import React from "react";
import {getRandomColor,createImageFromInitials} from './utils'
import {Link} from "react-router-dom";
import {Row, Col} from "react-bootstrap";

const ShopHeader = ({businessName, businessUrl, domain, cartCount}) => {

    let name = businessName;
    let imgSrc = "";
    return(
        <>
            <div className="Header">
                <Row>
                    <Col md={6}>
                        <ul>
                            <Link  to= {domain ? ('/') : (`/${businessUrl}`) }>
                                <li className="NavBrand">
                                    <img src={
                                    imgSrc.length <= 0
                                        ? createImageFromInitials(500, name, getRandomColor())
                                        : imgSrc
                                } alt="" className="logo-fluid"/>
                                    {businessName}
                                </li>
                            </Link>
                        </ul>

                    </Col>
                    <Col md={6}>
                        <div className="Account-nav">
                            <ul>
                                <li>
                                    <Link to="https://" className="Account-link">
                                        <i className="fas fa-search"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={domain ? ('/account') : (`/${businessUrl}/account`) } className="Account-link">
                                        <i className="fas fa-truck"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={domain ? ('/cart') : (`/${businessUrl}/cart`) } className="Account-link">
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

export default ShopHeader


