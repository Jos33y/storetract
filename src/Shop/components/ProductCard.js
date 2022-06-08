import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../css/styles.css'
import React from "react";


const ProductCard = ({product, id}) => {

    return(
        <>
            <Card className="product-card-store">
                <Link to={`/products/${ product.productCategory}/${id}`} className="Product-card-link">
                <Card.Img src={product.imgUrls[0]}  variant="top" alt="prod picture here" className="card-img-top" />
                </Link>

                <Card.Body className="card-body">
                    <div className="text">
                            <Link to={ `/products/${ product.productCategory}/${id}`} className="product-title">
                                <h5>{product.productName.length <= 50 ?
                                        (`${product.productName}`) : (`${product.productName.slice(0,50)}...`)}
                                </h5>
                            </Link>

                        {product.discountOffer ? (
                            <h5 className="product-price">
                                &#8358;{product.productDiscountPrice.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                <span className="strike">
                              &#8358;{product.productPrice.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </span>
                            </h5>
                        ) : (
                            <h5 className="product-price">&#8358;{product.productPrice.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
                        )}
                    </div>

                </Card.Body>
            </Card>

        </>
    )

}

export default ProductCard
