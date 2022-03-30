import {Col ,Container ,Row} from "react-bootstrap";
import "./Styles.css"
import OrderSummary from "./OrderSummary";
import CheckOutHeader from "./CheckOutHeader";
import CheckOutInfo from "./CheckOutInfo";
import ShopFooter from "../components/ShopFooter";
import CheckOutShipping from "./CheckOutShipping";


const CheckOutInformation = () => {

    return (
        <>
            <div className="Checkout">
                <Container>
                    <Row>
                        <Col md={7}>
                            <CheckOutHeader />
                            <CheckOutShipping />
                           {/*<CheckOutInfo />*/}
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
