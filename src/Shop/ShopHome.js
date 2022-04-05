import React from "react";
import ProductCard from "./components/ProductCard";
import {Row, Col,Container} from "react-bootstrap";
import Spinner from "../components/Spinner";

const ShopHome = ({products, businessUrl, loading}) => {

    return (
        <Container>

            <div className="Shop-products">
                { loading ?
                    (<Spinner/>)
                    : products && products.length > 0 ?
                        (
                            <>
                                <h6 className="small">{ products.length } Product(s)</h6>
                                <Row>

                                    { products.map((product) => (
                                        <Col md={ 3 } key={ product.id }>
                                            <ProductCard id={ product.id } product={ product.data }
                                                         businessUrl={ businessUrl }/>
                                        </Col>
                                    )) }
                                </Row>
                            </>
                        ) :
                        (<h6>No product available</h6>)
                }
            </div>

        </Container>
    )

}

export default ShopHome
