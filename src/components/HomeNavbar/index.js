import React from "react";
import './styles.css'
import {Link} from "react-router-dom";

const HomeNavbar = () => {
    return(
        <>
            <div className="Home-navbar">
                <ul>
                    <li><Link className="navbar-brand" to="/"> PackShop </Link> </li>                      <div className="buttons">
                        <li><Link className="btn btn-md btn-primary" to="/login">Login </Link> </li>
                        <li><Link className="btn btn-md btn-success" to="/register">Register </Link></li>
                    <li><Link className="btn btn-md btn-success" to="/admin-dash">Dashboard </Link></li>
                    </div>

                </ul>
            </div>
        </>
    )

}
export default HomeNavbar
