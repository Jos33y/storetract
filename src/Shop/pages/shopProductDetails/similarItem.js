import Spinner from "../../components/Spinner";
import {Col, Row} from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import React from "react";
import {Link} from "react-router-dom";

const SimilarItem = ({loading, products, businessUrl, domain}) => {

    return(
        <>
            <div className="Shop-home-products">
                { loading ?
                    (<Spinner/>)
                    : products && products.length > 0 ?
                        (
                            <>

                                <div className="Shop-home-title">
                                    <h3 className="home-title">Similar items you may like</h3>
                                    {
                                        domain ? (
                                            <Link to={`/products`} className="h5"> view all <i className="fas fa-chevron-right"></i></Link>
                                        ) : (
                                            <Link to={`/${businessUrl}/products`} className="h5"> view all <i className="fas fa-chevron-right"></i></Link>
                                        )
                                    }
                                </div>
                                {/*<h6 className="small">{ products.length } Product(s)</h6>*/}
                                <Row>

                                    { products.map((product) => (
                                        <Col md={ 3 } key={ product.id }>
                                            <ProductCard id={ product.id } product={ product.data }
                                                         businessUrl={ businessUrl } domain={domain} />
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