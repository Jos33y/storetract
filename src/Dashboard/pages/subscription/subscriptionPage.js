import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";


const SubscriptionPage = ({storeData}) => {
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Subscriptions </h2>
                </div>
                <div className="mb-4 subscription-page">
                    <Row>
                        <Col lg={4}>
                            <Card className="card subscription-details">
                                <div className="card-body">
                                    <h5>Current Plan:  <span className="plan"> {storeData.storePlan}  </span> </h5>
                                    <div className="row">
                                        <div className="col-7">
                                            <p>Subscription Start: </p>
                                            <p>Subscription Ends: </p>
                                        </div>
                                        <div className="col-5 text-end title">
                                            <p> {storeData.startDate ? storeData.startDate.toDate().toLocaleDateString() : 'Free'}</p>
                                            <p>  {storeData.endDate ? storeData.endDate.toDate().toLocaleDateString() : 'Free'}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col lg={5}>
                            <div className="upgrade-plan" >
                                <Card className="card">
                                    <div className="card-header standard">
                                        { storeData.storePlan === 'STANDARD' ? (
                                            <h5> Renew Standard Plan </h5>
                                        ) : (
                                            <h5> Upgrade to Standard</h5>
                                        ) }
                                    </div>
                                    <div className="card-body">
                                        <div className="price-text">
                                            <h3 className="price">₦2,500</h3>
                                            <h6 className="month">per month</h6>
                                        </div>
                                        <div className="price-features">
                                            <ul>
                                                <li><i className="fas fa-check"></i> Maximum of 100 products</li>
                                                <li><i className="fas fa-check"></i> Maximum of 3 images per product</li>
                                                <li><i className="fas fa-check"></i> Unlimited support</li>
                                                <li><i className="fas fa-check"></i> Access to all themes</li>
                                                <li><i className="fas fa-check"></i> 5 Store manager</li>
                                                <li><i className="fas fa-check"></i> Custom Domain</li>
                                                <li><i className="fas fa-check"></i> No Storetract watermark</li>
                                                <li><i className="fas fa-times"></i> Abandoned cart notification</li>
                                                <li><i className="fas fa-times"></i> Mobile App</li>
                                            </ul>
                                        </div>

                                        <div className="plan-button">
                                            { storeData.storePlan === 'STANDARD' ? (
                                                <Button type="button" className="btn btn-md btn-success standard"> Renew</Button>

                                            ) : (
                                                <Link to="/dashboard/subscriptions/buy-new-domain" className="btn btn-md btn-success standard" disabled={true}> Upgrade</Link>

                                            ) }
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )

}
export default SubscriptionPage
