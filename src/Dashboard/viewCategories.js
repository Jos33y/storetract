import {Col, Row} from "react-bootstrap";
import './styles.css'


const ViewCategories = ({category}) => {


    return (
        <>
            <div className="Form-category">
                <Row>
                    <Col md={12}>
                        <h5>Category Title: </h5>
                        <h6> {category.title}</h6>
                    </Col>
                    <Col md={12}>
                        <h5>Category Description: </h5>
                        <h6>{category.description}</h6>
                    </Col>
                </Row>
            </div>
        </>
    )

}
export default ViewCategories
