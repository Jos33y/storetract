import React from "react";
import {Link} from "react-router-dom";

const CartList = ({cart, businessUrl, onDelete}) => {

    return(
        <>
            <div className="Shopping-cart-box">
                <ul>
                    <li className="left-cart">
                        <div className="cart-img">
                            <img src={cart.imgUrls[0]} alt="" className="img-fluid"/>
                        </div>
                    </li>

                    <li className="middle-cart">
                        <div className="cart-texts">
                            <Link to={ `/${businessUrl}/products/${ cart.productCategory}/${cart.uniqueId}`} className="cart-name">
                                {cart.productName}
                            </Link>
                            <h5 className="quantity">{cart.qty} <i className="fas fa-times"></i> &#8358;{cart.productPrice.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
                        </div>
                    </li>

                    <li className="right-cart">
                        <div className="cart-right">
                            <h5 onClick={onDelete}> <i className="far fa-trash-alt"></i> </h5>
                            <h6 className="cart-price">&#8358;{(cart.productPrice * cart.qty).toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h6>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )

}
export default CartList