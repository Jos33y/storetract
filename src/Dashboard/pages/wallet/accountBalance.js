import {Card, Col, Row} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {collection, doc, getDoc, getDocs, query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";


const AccountBalance = ({userId, storeUrl}) => {

    const isMounted = useRef()
    const [currentBalance, setCurrentBalance] = useState(null);
    const [totalIncome, setTotalIncome] = useState('');
    const [totalWithdrawal, setTotalWithdrawal] = useState('');

    const getCurrentBalance = async () => {
        try {

            const currentRef = doc(db, 'shops', storeUrl, 'walletBalance', 'account')
            const currentSnap = await getDoc(currentRef)

            if(currentSnap.exists()) {
                setCurrentBalance(currentSnap.data())
                getTotalIncome().then()
                getTotalWithdrawal().then()
            }

        }catch (error) {
            console.log({error})
        }

    }

    const getTotalIncome = async () => {
        try {
            const getTotalRef = collection(db, 'shops', storeUrl, 'walletDepositHistory')
            const q = query(getTotalRef)
            const querySnap = await getDocs(q)

            let salesTotal = []
            querySnap.forEach((doc) => {
                // console.log(doc.data());
                return salesTotal.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            const sales = salesTotal.reduce((a, c) => a + c.data.amountDeposited++, 0);
            setTotalIncome(sales)
            console.log("sales: ", sales)

        }
        catch (error) {
            console.log({error})
            toast.error("currently can't get your total income")
        }
    }

    const getTotalWithdrawal = async () => {
        try {
            const getTotalRef = collection(db, 'shops', storeUrl, 'walletWithdrawalHistory')
            const q = query(getTotalRef)
            const querySnap = await getDocs(q)

            let salesTotal = []
            querySnap.forEach((doc) => {
                // console.log(doc.data());
                return salesTotal.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            const sales = salesTotal.reduce((a, c) => a + c.data.amount++, 0);
            setTotalWithdrawal(sales)
            console.log("sales: ", sales)

        }
        catch (error) {
            console.log({error})
            toast.error("currently can't get your total withdrawal")
        }

    }


    useEffect(() => {
        if(isMounted) {
            getCurrentBalance().then()
        }
        return () => {
            isMounted.current = false;
        }
// eslint-disable-next-line
    },[isMounted, userId])

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