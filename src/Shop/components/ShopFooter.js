import React from "react";
import {Link} from "react-router-dom";

const ShopFooter = ({businessName}) => {
    return(
        <>
            <div className="Footer">
                <p> {businessName} &copy; 2022</p>

                <div className="Socials">
                    <ul>
                        <li>
                            <Link to="https://" className="Socials-link">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="https://" className="Socials-link">
                                <i className="fab fa-twitter"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="https://" className="Socials-link">
                                <i className="fab fa-instagram-square"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="https://" className="Socials-link">
                                <i className="fab fa-pinterest-square"></i>
                            </Link>
                        </li>
                    </ul>

                </div>

            </div>
        </>
    )

}

export default ShopFooter


