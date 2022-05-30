import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const StorePricing = ({fullName}) => {
    return(
        <>
            <div className="store-pricing">
                <Container>
                    <div className="title-section">
                        <h5 className="title">
                            {`${fullName}`} Pick a plan to grow your business.
                        </h5>
                        <p className="sub-title">We are actively working towards providing the very best services at affordable prices. </p>
                    </div>

                    <div className="price-section">
                        <Row>
                            {/*basic plan*/}
                            <Col md={4}>
                                <Card className="card">
                                    <div className="card-header basic">
                                        <h5> Basic</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="price-text">
                                            <h3 className="price">₦0</h3>
                                            <h6 className="month">per month</h6>
                                        </div>
                                        <div className="price-features">
                                            <ul>
                                                <li><i className="fas fa-check"></i> Maximum of 20 products</li>
                                                <li><i className="fas fa-check"></i> Maximum of 3 images per product</li>
                                                <li><i className="fas fa-check"></i> Basic support</li>
                                                <li><i className="fas fa-check"></i> Access to basic themes</li>
                                                <li><i className="fas fa-check"></i> 1 Store manager</li>
                                                <li><i className="fas fa-times"></i> Abandoned cart notification</li>
                                                <li><i className="fas fa-times"></i> No Storetract watermark</li>
                                                <li><i className="fas fa-times"></i> Custom Domain</li>
                                                <li><i className="fas fa-times"></i> Mobile App</li>
                                            </ul>
                                        </div>

                                        <div className="plan-button">
                                            <Link disabled={true} className="btn btn-md btn-success basic" to="/onboarding/activate-basic-store"> Select</Link>
                                        </div>
                                    </div>
                                </Card>
                            </Col>

                            {/*standard plan*/}
                            <Col md={4}>
                                <Card className="card">
                                    <div className="card-header standard">
                                        <h5> Standard</h5>
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
                                                <li><i className="fas fa-times"></i> Abandoned cart notification</li>
                                                <li><i className="fas fa-times"></i> No Storetract watermark</li>
                                                <li><i className="fas fa-times"></i> Mobile App</li>
                                            </ul>
                                        </div>

                                        <div className="plan-button">
                                            <Link to="/onboarding/buy-domain" className="btn btn-md btn-success standard" disabled={true}> Select</Link>
                                        </div>
                                    </div>
                                </Card>
                            </Col>


                            {/*premium plan*/}
                            <Col md={4}>
                                <Card className="card">
                                    <div className="card-header premium">
                                        <h5> Premium</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="price-text">

                                            <h6 className="month">This has all base features,
                                                without restrictions and some extra features and direct support</h6>
                                            <br/>
                                        </div>
                                        <div className="price-features">
                                            <ul>
                                                <li><i className="fas fa-check"></i> Unlimited products</li>
                                                <li><i className="fas fa-check"></i> Maximum of 3 images per product</li>
                                                <li><i className="fas fa-check"></i> Priority support</li>
                                                <li><i className="fas fa-check"></i> Custom theme built just for you</li>
                                                <li><i className="fas fa-check"></i> Unlimited Store managers</li>
                                                <li><i className="fas fa-check"></i> Abandoned cart notification</li>
                                                <li><i className="fas fa-check"></i> No Storetract watermark</li>
                                                <li><i className="fas fa-check"></i> Custom Domain</li>
                                                <li><i className="fas fa-check"></i> Mobile App</li>
                                            </ul>
                                        </div>

                                        <div className="plan-button">
                                            <Button className="btn btn-md btn-success premium" disabled={true}> contact sales</Button>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                </Container>
            </div>

        </>
    )
}

export default StorePricing