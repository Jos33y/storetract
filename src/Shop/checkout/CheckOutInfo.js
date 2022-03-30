import {Button ,Col ,Form ,Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const CheckOutInfo = () => {

    const handleInfo = () => {
        console.log("Handling Information")
    }

    return (
        <>
            <div className="Checkout-information">
                <Form>
                    <h6>Contact Information</h6>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Email"/>
                    </div>

                    <h6>Shipping Address </h6>
                        <div className="form-group">
                           <Row>
                               <Col md={6}>
                                   <input type="text" className="form-control" placeholder="First Name"/>
                               </Col>
                               <Col md={6}>
                                   <input type="text" className="form-control" placeholder="Last Name"/>
                               </Col>
                           </Row>
                        </div>

                        <div className="form-group">
                            <select name="country" className="form-control" id=""  placeholder="Select a country">
                                <option value="" disabled={true} selected>Select Country</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <Row>
                                <Col md={6}>
                                    <select name="state" className="form-control" id="">
                                        <option value="" disabled={true} selected>Select State</option>
                                    </select>
                                </Col>
                                <Col md={6}>
                                    <select name="state" className="form-control" id="">
                                        <option value="" disabled={true} selected >Select City</option>
                                    </select>
                                </Col>
                            </Row>
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Delivery Address"/>
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Phone Number"/>
                        </div>
                    <div className="form-group">
                        <textarea name="delivery-note" className="form-control" id="note" cols="30" rows="4" placeholder="delivery note"></textarea>
                    </div>

                    <div className="form-group">
                        <Row>
                            <Col md={4}>
                                <Button className="btn btn-md btn-primary" onClick={handleInfo}> Continue to Shipping</Button>
                            </Col>
                            <Col md={4}>
                                <p><Link to="https://" className="link"> Return to Cart</Link></p>
                            </Col>
                        </Row>
                    </div>
                </Form>

            </div>
        </>
    )

}

export default CheckOutInfo
