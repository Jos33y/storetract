import {Container} from "react-bootstrap";

const StoreActivated = () => {

    return(
        <>
            <Container>
                <div className="store-activated">
                    <i className="far fa-check-circle"></i>
                    <h5>Store Activated Successfully</h5>
                    <a href='/dashboard/home' className="btn btn-md btn-success"> Start Selling</a>
                </div>
            </Container>
        </>
    )
}

export default StoreActivated