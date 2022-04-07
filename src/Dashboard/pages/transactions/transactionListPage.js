import React from "react";
import {Col ,Row ,Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import Amex from "../../../assets/images/payments/1.png";
import MasterCard from "../../../assets/images/payments/2.png";
import PayPal from "../../../assets/images/payments/3.png";
import Visa from "../../../assets/images/payments/4.png";

const TransactionListPage = () => {
    return (
        <>
            <header className="border-bottom mb-4 pb-4">
                <Row>
                    <Col lg={5} className="col-6 me-auto">
                        <input type="text" placeholder="search" className="form-control"/>
                    </Col>
                    <Col lg={2} className="col-6">
                        <select className="form-select">
                            <option value="Method">Method</option>
                            <option value="Master card">Master card</option>
                            <option value="Visa Card">Visa card</option>
                            <option value="Paypal">Paypal </option>
                        </select>
                    </Col>

                </Row>
            </header>
            <div className="table-responsive">
                <Table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Paid</th>
                            <th>Method</th>
                            <th>Date</th>
                            <th className="text-end"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/*Row one*/}
                        <tr>
                            <td className="bold">#56678</td>
                            <td>&#8358; 56,890.00</td>
                            <td>
                                <div className="icontext">
                                    <img width={36} src={Amex} className="icon border" alt="Payment"/>
                                    <span className="text text-muted">Amex</span>
                                </div>
                            </td>
                            <td> 16.12.2021, 14:21</td>
                            <td className="text-end">
                                <Link to="https://" className="btn btn-light btn-analytics">Details </Link>
                            </td>
                        </tr>

                    {/*Row one*/}
                    <tr>
                        <td className="bold">#134768</td>
                        <td>&#8358; 87,980.00</td>
                        <td>
                            <div className="icontext">
                                <img width={36} src={Visa} className="icon border" alt="Payment"/>
                                <span className="text text-muted">Visa card</span>
                            </div>
                        </td>
                        <td> 14.12.2021, 14:21</td>
                        <td className="text-end">
                            <Link to="https://" className="btn btn-light btn-analytics">Details </Link>
                        </td>
                    </tr>


                    {/*Row one*/}
                    <tr>
                        <td className="bold">#4564</td>
                        <td>&#8358; 908,890.00</td>
                        <td>
                            <div className="icontext">
                                <img width={36} src={PayPal} className="icon border" alt="Payment"/>
                                <span className="text text-muted">PayPal</span>
                            </div>
                        </td>
                        <td> 12.12.2021, 14:21</td>
                        <td className="text-end">
                            <Link to="https://" className="btn btn-light btn-analytics">Details </Link>
                        </td>
                    </tr>


                    {/*Row one*/}
                    <tr>
                        <td className="bold">#54458</td>
                        <td>&#8358; 26,890.00</td>
                        <td>
                            <div className="icontext">
                                <img width={36} src={PayPal} className="icon border" alt="Payment"/>
                                <span className="text text-muted">PayPal</span>
                            </div>
                        </td>
                        <td> 12.12.2021, 14:21</td>
                        <td className="text-end">
                            <Link to="https://" className="btn btn-light btn-analytics">Details </Link>
                        </td>
                    </tr>


                    {/*Row one*/}
                    <tr>
                        <td className="bold">#98667</td>
                        <td>&#8358; 6,890.00</td>
                        <td>
                            <div className="icontext">
                                <img width={36} src={Amex} className="icon border" alt="Payment"/>
                                <span className="text text-muted">Amex</span>
                            </div>
                        </td>
                        <td> 10.12.2021, 14:21</td>
                        <td className="text-end">
                            <Link to="https://" className="btn btn-light btn-analytics">Details </Link>
                        </td>
                    </tr>


                    {/*Row one*/}
                    <tr>
                        <td className="bold">#06678</td>
                        <td>&#8358; 16,760.00</td>
                        <td>
                            <div className="icontext">
                                <img width={36} src={MasterCard} className="icon border" alt="Payment"/>
                                <span className="text text-muted">Mastercard</span>
                            </div>
                        </td>
                        <td> 08.12.2021, 14:21</td>
                        <td className="text-end">
                            <Link to="https://" className="btn btn-light btn-analytics">Details </Link>
                        </td>
                    </tr>
                    </tbody>
            </Table>
            </div>
        </>
    )

}
export default TransactionListPage
