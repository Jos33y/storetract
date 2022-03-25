import React from "react";
import {getRandomColor,createImageFromInitials} from './utils'
import {Link} from "react-router-dom";

const ShopHeader = ({businessName, businessUrl}) => {

    let name = businessName;
    let imgSrc = "";
    return(
        <>
            <div className="Header">
                <ul>
                    <Link to={`/${businessUrl}`}>
                        <li className="NavBrand"> <img src={
                            imgSrc.length <= 0
                                ? createImageFromInitials(500, name, getRandomColor())
                                : imgSrc
                        } alt="" className="logo-fluid"/>
                            {businessName}
                        </li>
                    </Link>
                </ul>

            </div>
        </>
    )

}

export default ShopHeader


