import React from "react";
import {Card} from "react-bootstrap";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg";

const WalletPage = () => {
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Wallet </h2>
                </div>
                <Card className="card mb-4">
                    <div className="card-body">
                        <div className="No-category">
                            <h5>Wallet under construction</h5>
                            <img src={NotFoundImage} alt="" className="img-fluid"/>
                        </div>
                    </div>

                </Card>
            </section>
        </>
    )

}
export default WalletPage
