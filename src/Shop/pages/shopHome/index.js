import React from "react";
import {Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

import ShopHomeProduct from "./shopHomeProduct";
import ShopHomeCategories from "./shopHomeCategories";

const ShopHome = ({products, loading, categories, shopData}) => {

    return (
        <>
            <div className="Hero-store">
                <Row>
                    <Col md={5}>
                        <div className="Hero-store-text">
                            <h3>{shopData.businessName}</h3>
                            <h5> {shopData.storeDescription ? shopData.storeDescription : 'About Store'} </h5>
                            <Link to="products" className="btn btn-md btn-success"> Shop now </Link>
                        </div>
                    </Col>
                    <Col md={7}>
                        <div className="Hero-store-img">
                            <img src={`${shopData.storeBanner ? shopData.storeBanner : ('http://placehold.jp/700x450.png')}`} alt="" className="img-fluid"/>
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
