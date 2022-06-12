import {Card, Col, Row} from "react-bootstrap";
import React from "react";


const AccountBalance = ({currentBalance, totalWithdrawal, totalIncome}) => {

    return (
        <>
            <div className="account-balance">
                <Row>
                    <Col md={4}>
                        <Card className="card current-balance">
                            <div className="card-body">
                                <h5 className="balance"> &#8358;{currentBalance ? (currentBalance.accountBalance.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : '0.00'} </h5>
                                <div className="acct-row">
                                    <div className="acct-text">
                                        <p>account balance</p>
                                        <p className="light">displaying current balance</p>
                                    </div>
                                    <div className="acct-icon">
                                        <i className="fas fa-exchange-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="card income-balance">
                            <div className="card-body">
                                <h5 className="balance"> &#8358;{totalIncome ? (totalIncome.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : '0.00'} </h5>
                                <div className="acct-row">
                                    <div className="acct-text">
                                        <p> total income</p>
                                        <p className="light">displaying total income</p>
                                    </div>
                                    <div className="acct-icon">
                                        <i className="fas fa-arrow-circle-up"></i>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="card outgoing-balance">
                            <div className="card-body">
                                <h5 className="balance"> &#8358;{ totalWithdrawal ? (totalWithdrawal.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : '0.00'} </h5>
                                <div className="acct-row">
                                    <div className="acct-text">
                                        <p>total withdrawal</p>
                                        <p className="light">displaying total withdrawals</p>
                                    </div>
                                    <div className="acct-icon">
                                        <i className="fas fa-arrow-circle-down"></i>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

        </>
    );
}
export default AccountBalance