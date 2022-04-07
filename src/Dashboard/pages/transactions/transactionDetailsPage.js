import React from "react";
import {Link} from "react-router-dom";

const TransactionDetailsPage = () => {
    return (
        <>
            <div className="box bg-light" style={{minHeight: "80%"}}>
                {/*<p className="text-center text-muted my-5">*/}
                {/*    Please select transaction <br/> to see details*/}
                {/*</p>*/}
                <h6>Transaction Details</h6>
                <hr/>
                <h6 className="mb-0">Supplier: </h6> <p>TemplateMount</p>
                <h6 className="mb-0">Date: </h6> <p>February 19th, 2022</p>
                <h6 className="mb-0">Billing address: </h6> <p>1901 Thornier Cir. Shiloh, Hawaii 81063</p>
                <h6 className="mb-0">VAT ID: </h6> <p>64847847847</p>
                <h6 className="mb-0">Email: </h6> <p>support@mymail.com</p>
                <h6 className="mb-0">Item purchased: </h6>
                <p>
                    <Link to="https://"> Adidas Air Jordan <i className="fas fa-external-link-alt"></i></Link> <br/>
                    <Link to="https://"> Nike Palazzo Shoes <i className="fas fa-external-link-alt"></i></Link>
                </p>

                <p>Payment: Mastercard</p>
                <p className="h4"> &#8358; 102,876.00</p>
                <hr/>
                <Link to="https://" className="btn btn-light btn-analytics">Download Receipt </Link>
            </div>
        </>
    )

}
export default TransactionDetailsPage
