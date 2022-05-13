import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const StoreActivated = () => {

    return(
        <>
            <Container>
                <div className="store-activated">
                    <i className="far fa-check-circle"></i>
                    <h5>Store Activated Successfully</h5>
                    <Link to='/dashboard/home' className="btn btn-md btn-success"> Start Selling</Link>
                </div>
            </Container>
        </>
    )
}

export default StoreActivated