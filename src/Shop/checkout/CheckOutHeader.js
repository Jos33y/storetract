import LogoHead from "../../assets/images/packnow.jpg"
import {Link} from "react-router-dom";
import React ,{useState} from "react";

const CheckOutHeader = ({active}) => {


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
                           <span className={active == 'checkout-info' ? 'active' : 'link'}> Information</span>
                        </li>
                        <i className="fas fa-chevron-right"></i>
                        <li>
                            <span className={active == 'checkout-shipping' ? 'active' : 'link'}> Shipping</span>
                        </li>
                        <i className="fas fa-chevron-right"></i>
                        <li>
                            <span className={active == 'checkout-payment' ? 'active' : 'link'}> Payment</span>
                        </li>
                        <i className="fas fa-chevron-right"></i>
                        <li>
                            <span className={active == 'checkout-confirm' ? 'active' : 'link'}> Order Confirmation</span>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    )

}
export default CheckOutHeader
