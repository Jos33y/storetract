import {Col, Row} from "react-bootstrap";
import CatImageOne from "../../assets/images/shopimages/43534.jpg"
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner";
const ShopHomeCategories = ({loading, categories}) => {

    return(
        <>
            <div className="Store-home-categories">
                { loading ?
                    (<Spinner/>)
                    : categories && categories.length > 0 ?
                        (
                            <>
                <h3 className="head">Check out store categories</h3>
                <Row>
                    { categories.map((category) => (
                    <Col md={4} className="col-6" key={ category.id }>
                        <div className="store-cat-box">
                            <div className="store-cat-img">
                                <img src={category.data.img ? category.data.img :  CatImageOne} alt="" className="img-fluid"/>
                            </div>
                            <Link to={`/category/${category.data.categoryUrl}`} className="btn btn-md btn-secondary"> {category.data.title} </Link>
                        </div>
                    </Col>
                    )) }
                </Row>
                </>
                ) :
                (<h6 className="text-center">No categories available</h6>)
                }
            </div>
        </>
    )
}

export default ShopHomeCategories