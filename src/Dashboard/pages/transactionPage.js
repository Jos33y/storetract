import React from "react";
import "./pagesStyles.css"
import {Card ,Col ,Row} from "react-bootstrap";
import TransactionListPage from "./transactions/transactionListPage";
import TransactionDetailsPage from "./transactions/transactionDetailsPage";

const TransactionPage = () => {

    return(
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title">Transactions </h2>
                </div>
                <Card className="card">
                    <div className="card-body">
                        <Row>
                            <Col lg={9}>
                                <TransactionListPage />
                            </Col>

                            <aside className="col-lg-3">
                                <TransactionDetailsPage />
                            </aside>
                        </Row>
                    </div>
                </Card>
            </section>
        </>
    )

}
export default TransactionPage
