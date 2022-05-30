import React from "react";
import {Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import HeroImage from "../../assets/images/shopimages/beautiful-casual.jpg"

import ShopHomeProduct from "./shopHomeProduct";
import ShopHomeCategories from "./shopHomeCategories";

const ShopHome = ({products, loading, businessName, categories}) => {

    return (
        <>
            <div className="Hero-store">
                <Row>
                    <Col md={5}>
                       <div className="Hero-store-text">
                           <h3>{businessName}</h3>
                           <h5>
                               We want your child to feel comfortable, loved and free.
                               Our organic and fair-trade clothing ensures that your baby
                               can play and be happy.
                           </h5>
                           <Link to="products" className="btn btn-md btn-success"> Shop now </Link>
                       </div>
                    </Col>
                    <Col md={7}>
                        <div className="Hero-store-img">
                            <img src={HeroImage} alt="" className="img-fluid"/>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="container-fluid">
                <ShopHomeCategories loading={loading} categories={categories} />
                <ShopHomeProduct loading={loading} products={products} />
            </div>
        </>
    )


}

export default ShopHome
