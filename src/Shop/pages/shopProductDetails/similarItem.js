import Spinner from "../../components/Spinner";
import {Col, Row} from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import React from "react";

const SimilarItem = ({loading, products, businessUrl}) => {

    return(
        <>
            <div className="store-home-products">
                { loading ?
                    (<Spinner/>)
                    : products && products.length > 0 ?
                        (
                            <>
                                <h3 className="home-title">Similar items you may like</h3>
                                {/*<h6 className="small">{ products.length } Product(s)</h6>*/}
                                <Row>

                                    { products.map((product) => (
                                        <Col md={ 3 } className="col-6" key={ product.id }>
                                            <ProductCard id={ product.id } product={ product.data }
                                                         businessUrl={ businessUrl } />
                                        </Col>
                                    )) }
                                </Row>
                            </>
                        ) :
                        (<h6>No product available</h6>)
                }
            </div>
        </>
    )

}
export default SimilarItem