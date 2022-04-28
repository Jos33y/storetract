import React from "react";
import "../css/shopHeader.css"
import {Link} from "react-router-dom";
import {Dropdown, Container} from "react-bootstrap";

const ShopHeader = ({businessName, businessUrl, domain, cartCount}) => {
    //
    // let name = businessName;
    // let imgSrc = "";
    return(
        <>
            <div className="Header-two">
                <Container>
                    <ul>
                        <li><Link to= {domain ? ('/') : (`/${businessUrl}`) } className="Shop-name"> {businessName} </Link></li>
                        <li>
                            <div className="form-group">
                                <input type="text" placeholder="Search" className="form-control"/>
                                <button className="btn btn-sm btn-outline"> <i className="fas fa-search"></i> </button>
                            </div>
                        </li>
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropDown">
                                    Categories
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#"> Lingerie</Dropdown.Item>
                                    <Dropdown.Item href="#"> HandBag</Dropdown.Item>
                                    <Dropdown.Item href="#"> Shoes</Dropdown.Item>
                                    <Dropdown.Item href="#"> Chain</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li className="button-cart"> <Link to={domain ? ('/cart') : (`/${businessUrl}/cart`) }
                                                           className="Cart-button"> <i className="fas fa-shopping-cart"></i>
                            Cart: <span className="number">{cartCount ? (cartCount) : '0' }</span></Link></li>

                        {/*<Link to={domain ? ('/account') : (`/${businessUrl}/account`) } className="Account-link">*/}
                        {/*    <i className="fas fa-truck"></i>*/}
                        {/*</Link>*/}
                    </ul>
                </Container>

            </div>
        </>
    )

}

export default ShopHeader


