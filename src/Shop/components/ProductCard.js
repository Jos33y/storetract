import {Button ,Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../css/styles.css'
import React, {useState} from "react";
import QuickViewModal from "../others/modal/QuickViewModal";
import QuickView from "../others/modal/QuickView";
// import ProdImage from "../../assets/images/shopimages/61Dr0DoZ2aL.png";


const ProductCard = ({product, businessUrl, id}) => {
    const [isQuickView, setQuickView] = useState(false);

    return(
        <>
            <Card className="product-card-shop">

                <Link to={`/products/${ product.productCategory}/${id}`} className="Product-card-link">

                <Card.Img src={product.imgUrls[0]}  variant="top" alt="prod picture here" className="card-img-top" />
                </Link>
                <Card.Body className="card-body">
                    <div className="text">
                            <Link to={ `/products/${ product.productCategory}/${id}`} className="product-title">
                                {product.productName}
                            </Link>
                    </div>
                    <div className="card-shop-footer">
                        <Button className="btn btn-md btn-outline">Add <i className="fas fa-plus"></i></Button>
                        <h5 className="product-price">&#8358;{product.productPrice.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
                    </div>
                </Card.Body>

            </Card>

            {/*<Card className="Shop-product-card">*/}
            {/*    <Link to={ `/${businessUrl}/${ product.productCategory}/${id}`} className="Product-card-link">*/}
            {/*        <Card.Img src={product.imgUrls[0]} variant="top" alt="Product img here" className="card-img-top" />*/}
            {/*    </Link>*/}
            {/*    <Card.Body className="card-body">*/}
            {/*        <h6>{product.productName}</h6>*/}
            {/*        <div className="Price">*/}
            {/*            <p className="Price-one"> &#8358;{product.productPrice.toString()*/}
            {/*                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>*/}
            {/*            {product.offer && (<p className="Price-two"> &#8358;{product.productDiscountPrice.toString()*/}
            {/*                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>)}*/}

            {/*        </div>*/}
            {/*    </Card.Body>*/}
            {/*    <Card.Footer>*/}
            {/*        <div className="buttons">*/}
            {/*            <Button className="btn btn-sm btn-success"*/}
            {/*                    onClick={() => {*/}
            {/*                setQuickView(true);*/}
            {/*            }}>*/}
            {/*                Quick View*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    </Card.Footer>*/}
            {/*</Card>*/}



            {/** Modals Here */}
            <QuickViewModal  open={isQuickView} onClose={() => setQuickView(false)}>
                <QuickView product={product} />
            </QuickViewModal>



        </>
    )

}

export default ProductCard
