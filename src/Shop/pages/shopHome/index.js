import React from "react";
import {Row, Col, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import HeroImage from "../../../assets/images/shopimages/hero-image-side.svg"
import ShopHomeProduct from "./shopHomeProduct";
import ShopTrendingNow from "./shopTrendingNow";



const ShopHome = ({products, businessUrl, loading}) => {

    return (
        <Container>

            <div className="Hero-shop">
               <Container>
                   <div className="Hero-shop-box">
                       <Row>
                           <Col md={6}>
                               <div className="Hero-shop-text">
                                   <h3>Fashion Home</h3>
                                   <h5>Let's make your shopping life easier</h5>
                                   <Link to="products" className="btn btn-md btn-success"> Shop now </Link>
                               </div>
                           </Col>
                           <Col md={6}>
                               <div className="Hero-shop-img">
                                   <img src={HeroImage} alt="" className="Hero-img"/>
                               </div>
                           </Col>
                       </Row>
                   </div>
               </Container>
            </div>

            <ShopHomeProduct loading={loading} products={products} businessUrl={businessUrl} />
            <ShopTrendingNow />

        </Container>
    )

}

export default ShopHome
