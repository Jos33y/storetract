import {Button ,Col ,Row ,Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const CheckOutShipping = () => {

    const handleShipping = () => {
        console.log("Handling Information")
    }

    return (
        <>
            <div className="Shipping">
                {/*shipping address*/}
                <div className="Shipping-address">
                    <Table className="table">
                        <tbody>
                        <tr>
                            <td><p className="text-head"> Contact</p></td>
                            <td> <p>josephlagbalu@gmail.com </p></td>
                            <td> <Link to="https://" className="link">Change</Link> </td>
                        </tr>

                        <tr>
                            <td><p className="text-head"> Ship to</p></td>
                            <td> <p>My QR KARD, 333 Fremont Street, San Francisco CA 94105, United States </p></td>
                            <td> <Link to="https://" className="link">Change</Link> </td>
                        </tr>
                        </tbody>
                    </Table>

                </div>

                {/*shipping method*/}
                <div className="Shipping-method">
                    <h6>Shipping method</h6>
                    <tbody className="Shipping-method-table">
                        <tr>
                            <td>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Default radio
                                        </label>
                                </div>
                            </td>
                            <td> <p>Free</p> </td>
                        </tr>
                    </tbody>

                </div>

                {/*buttons section*/}
                <div className="form-group">
                    <Row>
                        <Col md={4}>
                            <Button className="btn btn-md btn-primary" onClick={handleShipping}> Continue to payment</Button>
                        </Col>
                        <Col md={4}>
                            <p><Link to="https://" className="link"> Return to information</Link></p>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )

}

export default CheckOutShipping
