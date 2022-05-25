import React, {useEffect, useRef, useState} from "react";
import "../css/shopHeader.css"
import {Link} from "react-router-dom";
import {Dropdown, Container} from "react-bootstrap";

const ShopHeader = ({businessName, businessUrl, categories}) => {
    //
    // let name = businessName;
    // let imgSrc = "";
    const isMounted = useRef()
    const [cart ,setCart] = useState([])


    useEffect(() => {
        if (isMounted) {
            let localCart = localStorage.getItem("cart");
            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) setCart(localCart)

        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[isMounted])
    return(
        <>
            <div className="Header-two">
                <Container>
                    <ul>
                        <li><Link to= {'/'} className="Shop-name"> {businessName} </Link></li>
                        <li>
                            <div className="form-group">
                                <input type="text" placeholder="Search" className="form-control"/>
                                <button className="btn btn-sm btn-outline"> <i className="fas fa-search"></i> </button>
                            </div>
                        </li>
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle variant="transparent"  id="dropdown-basic" className="dropDown">
                                    Categories
                                </Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        {categories.map((category) => (
                                            <Dropdown.Item href={ `/category/${ category.data.categoryUrl }` } key={ category.id }> {category.data.title} </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li className="button-cart"> <Link to={'/cart'}
                                                           className="Cart-button"> <i className="fas fa-shopping-cart"></i>
                            Cart: <span className="number">{ cart.length > 0 ? ( cart.length ) : '0' }</span></Link></li>

                        {/*<Link to={'/account'} className="Account-link">*/}
                        {/*    <i className="fas fa-truck"></i>*/}
                        {/*</Link>*/}
                    </ul>
                </Container>

            </div>
        </>
    )

}

export default ShopHeader


