import {Col, Row} from "react-bootstrap";
import CatImageOne from "../../assets/images/shopimages/cat-image-one.svg"
import CatImageTwo from "../../assets/images/shopimages/cat-image-two.svg"
import CatImageThree from "../../assets/images/shopimages/cat-image-three.svg"
const ShopTrendingNow = () => {

    return(
        <>
            <div className="Shop-trending">
                <h3 className="Shop-trending-head">Trending Now</h3>
                <Row>
                    <Col md={4}>
                        <div className="Shop-trending-box">
                            <img src={CatImageOne} alt="" className="img-fluid"/>
                            <h5 className="Shop-trend-text">Blazing</h5>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="Shop-trending-box">
                            <img src={CatImageTwo} alt="" className="img-fluid"/>
                            <h5 className="Shop-trend-text">Hot</h5>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="Shop-trending-box">
                            <img src={CatImageThree} alt="" className="img-fluid"/>
                            <h5 className="Shop-trend-text">New</h5>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ShopTrendingNow