import {Button ,Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../styles.css'


const ProductCard = ({product}) => {

    return(
        <>
            <Card className="Shop-product-card">
                <Link to="/" className="Product-card-link">
                    <Card.Img src={product.imgUrls[0]} variant="top" alt="Product img here" className="card-img-top" />
                </Link>
                <Card.Body className="card-body">
                    <h6>{product.productName}</h6>
                    <div className="Price">
                        <p className="Price-one"> &#8358;{product.productPrice.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                        {product.offer && (<p className="Price-two"> &#8358;{product.productDiscountPrice.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>)}

                    </div>
                </Card.Body>
                <Card.Footer>
                    <div className="buttons">
                        <Button className="btn btn-sm btn-success">
                            Quick View
                        </Button>
                    </div>
                </Card.Footer>
            </Card>


        </>
    )

}

export default ProductCard
