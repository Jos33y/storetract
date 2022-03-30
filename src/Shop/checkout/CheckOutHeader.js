import LogoHead from "../../assets/images/packnow.jpg"
import {Link} from "react-router-dom";
import React from "react";

const CheckOutHeader = () => {

    return (
        <>
            <div className="Checkout-header">
                <div className="checkout-img-box">
                    <img src={LogoHead} alt="" className="img-fluid"/>
                </div>
                <div className='bread-crumb'>
                    <ul>
                        <li>
                            <Link  to="https://" className="bread-crumb-link"> Cart</Link>
                        </li>
                        <i className="fas fa-chevron-right"></i>
                        <li>
                           <span className="active"> Information</span>
                        </li>
                        <i className="fas fa-chevron-right"></i>
                        <li>
                            <span className="link"> Shipping</span>
                        </li>
                        <i className="fas fa-chevron-right"></i>
                        <li>
                            <span className="link"> Payment</span>
                        </li>
                        <i className="fas fa-chevron-right"></i>
                        <li>
                            <span className="link"> Order Confirmation</span>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    )

}
export default CheckOutHeader
