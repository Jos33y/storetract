import {Col ,Container ,Row} from "react-bootstrap";

const ShopLogin = () => {

    return (
        <>
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="account-tab">
                            <ul>
                                <li><h5>Login</h5></li>
                                <li><h5>Register</h5></li>
                            </ul>
                        </div>

                        <div className="account-login">

                        </div>

                    </Col>
                </Row>
            </Container>
        </>

    )

}
export default ShopLogin
