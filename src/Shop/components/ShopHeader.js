import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

const ShopHeader = ({businessName }) => {
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
            <nav className="Store-header sticky-top">
                <ul>
                    <li className="name-nav"><Link to= {'/'} className="store-name"> {businessName} </Link></li>
                    <li className="store-navbar">
                        <li className='home-link'><Link to= {'/'} className="link"> Home </Link></li>
                        <li><Link to= {'/products'} className="link"> Shop </Link></li>
                        <li><Link to= {'/track-order'} className="link"> Track Order </Link></li>
                        <li className="shopping-cart"><Link to= {'/cart'} className="link">
                            <i className="fas fa-shopping-cart"> </i> Shopping cart ({ cart.length > 0 ? ( cart.length ) : '0' }) </Link></li>
                    </li>

                </ul>
            </nav>
        </>
    )

}

export default ShopHeader


