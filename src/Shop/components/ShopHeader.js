import React from "react";
import {getRandomColor,createImageFromInitials} from './utils'

const ShopHeader = ({businessName}) => {

    let name = businessName;
    let imgSrc = "";
    return(
        <>
            <div className="Header">
                <ul>
                    <li className="NavBrand"> <img src={
                        imgSrc.length <= 0
                            ? createImageFromInitials(500, name, getRandomColor())
                            : imgSrc
                    } alt="" className="logo-fluid"/>
                        {businessName}
                    </li>
                </ul>

            </div>
        </>
    )

}

export default ShopHeader


