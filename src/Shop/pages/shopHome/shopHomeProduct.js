import Spinner from "../../components/Spinner";
import "../../css/shopHeader.css"
import {Col, Row} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

const ShopHomeProduct = ({loading, products}) => {

    return(
        <>
            <div className="Store-home-products">
                { loading ?
                    (<Spinner/>)
                    : products && products.length > 0 ?
                        (
                            <>
                <h3 className="head">An inside look to our products...</h3>
                <Row>
                    { products.map((product) => (
                    <Col lg={3} className="col-md-3 col-6" key={ product.id }>
                        <div className="store-prod-box">
                            <img src={product.data.imgUrls[0]} alt="" className="img-fluid"/>
                        </div>
                    </Col>
                    )) }
                </Row>
                <Link to="/products" className="btn btn-md btn-secondary"> View all</Link>
                            </>
                ) :
                (<h6>No product available</h6>)
                }
            </div>
        </>
    )

}
export default ShopHomeProduct