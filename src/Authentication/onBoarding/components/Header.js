import {Link} from "react-router-dom";
import StoreTractLogo from "../../../assets/images/logo-svg.svg";
import React from "react";

const Header = () => {

    return(
        <>
           <div className="on-boarding-header">
               <ul>
                   <li>
                       <Link to="/">
                           <img src={StoreTractLogo} alt="" className="logo-fluid"/>
                       </Link>
                   </li>

                   <li>
                      {/*<h5>On Boarding </h5>*/}
                   </li>
               </ul>
           </div>
        </>
    )

}
export default Header