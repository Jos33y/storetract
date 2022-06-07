import React from "react";
import {Col, Row} from "react-bootstrap";
import AccountBalance from "./accountBalance";
import WithdrawalPage from "./withdrawalPage";
import RecentWithdrawals from "./recentWithdrawals";

const WalletPage = ({userId, storeUrl}) => {
    return (
        <>
            <section className="content-main">
               <AccountBalance userId={userId} storeUrl={storeUrl} />
                <div className="section-two">
                    <Row>
                        <Col lg={4}>
                            <WithdrawalPage storeUrl={storeUrl} userId={userId} />
                        </Col>

                        <Col lg={8}>
                            <RecentWithdrawals storeUrl={storeUrl} userId={userId} />
                        </Col>
                    </Row>
                </div>

            </section>
        </>
    )

}
export default WalletPage
