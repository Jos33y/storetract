import React, {useEffect, useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import AccountBalance from "./accountBalance";
import WithdrawalPage from "./withdrawalPage";
import RecentWithdrawals from "./recentWithdrawals";
import {collection, doc, getDoc, getDocs, query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";

const WalletPage = ({userId, storeUrl, profileData}) => {

    const isMounted = useRef()
    const [accountDetails, setAccountDetails] = useState(null)
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
                return salesTotal.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            const sales = salesTotal.reduce((a, c) => a + c.data.amountDeposited++, 0);
            setTotalIncome(sales)

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
                return salesTotal.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            const sales = salesTotal.reduce((a, c) => a + c.data.totalWithdraw++, 0);
            setTotalWithdrawal(sales)

        }
        catch (error) {
            console.log({error})
            toast.error("currently can't get your total withdrawal")
        }

    }

    const getAccountDetails = async () => {
        try {
            const currentRef = doc(db, 'shops', storeUrl, 'walletBalance', 'accountInfo')
            const currentSnap = await getDoc(currentRef)

            if(currentSnap.exists()) {
                setAccountDetails(currentSnap.data())
            }

        }catch (error) {
            console.log({error})
        }
    }

    useEffect(() => {
        if(isMounted) {
            getCurrentBalance().then()
            getAccountDetails().then()
        }
        return () => {
            isMounted.current = false;
        }
// eslint-disable-next-line
    },[isMounted, userId])

    return (
        <>
            <section className="content-main">
               <AccountBalance totalIncome={totalIncome} totalWithdrawal={totalWithdrawal} currentBalance={currentBalance} />
                <div className="section-two">
                    <Row>
                        <Col lg={4}>
                            <WithdrawalPage userId={userId} profileData={profileData} storeUrl={storeUrl} currentBalance={currentBalance} accountDetails={accountDetails} />
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
