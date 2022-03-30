import {Col ,Container ,Row} from "react-bootstrap";
import "./Styles.css"
import OrderSummary from "./OrderSummary";
import CheckOutHeader from "./CheckOutHeader";
import ShopFooter from "../components/ShopFooter";
import CheckOutInfo from "./CheckOutInfo";
// import CheckOutShipping from "./CheckOutShipping";
// import CheckOutPayment from "./CheckOutPayment";
// import OrderConfirmation from "./OrderConfirmation";


const CheckOutInformation = () => {

    return (
        <>
            <div className="Checkout">
                <Container>
                    <Row>
                        <Col md={7}>
                            <CheckOutHeader />
                            {/*<CheckOutShipping />*/}
                           <CheckOutInfo />
                           {/* <CheckOutPayment />*/}
                           {/* <OrderConfirmation />*/}
                        </Col>
                        <Col md={5}>
                            <OrderSummary />
                        </Col>
                    </Row>
                </Container>
            </div>
            <ShopFooter businessName="Johnson Enterprises" />
        </>
    )

}
export default CheckOutInformation
