import {Container} from "react-bootstrap";

const PaymentSuccessful = () => {

    return(
        <>
            <Container>
                <div className="store-activated">
                    <i className="far fa-check-circle"></i>
                    <h5>Store Upgraded Successfully</h5>
                    <p>store domain will be activated in less than 12 hours.</p>
                    <a href='/dashboard/subscriptions' className="btn btn-md btn-success"> Check Subscriptions</a>
                </div>
            </Container>
        </>
    )
}

export default PaymentSuccessful