import {Button ,Card} from "react-bootstrap";
import ImageOne from '../assets/images/products/yazzy-one.jpg'
import {Link} from "react-router-dom";

const ViewProducts = ({product, id}) => {

    return (
        <>
            <Card className="Product-card">
                <Card.Img src={product.imgUrls[0]} variant="top" alt="Product img here" className="card-img-top" />
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
                        <Link to={`/${product.productCategory}/${id}`} className="btn btn-sm btn-primary left">
                            Edit
                        </Link>
                        <Button className="btn btn-sm btn-danger">
                            Delete
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </>
    )

}
export default ViewProducts
