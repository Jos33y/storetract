import React, {useEffect, useRef, useState} from "react";
import {Col ,Row ,Table} from "react-bootstrap";
import MasterCard from "../../../assets/images/payments/2.png";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg";
import Spinner from "../../../components/Spinner";

const TransactionListPage = ({storeUrl, userId}) => {

    const isMounted = useRef()
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    const getTransactions= async () => {
        setLoading(true)
        try {
            const getTransactionRef= collection(db, 'shops', storeUrl, 'transactions')
            const q = query(getTransactionRef)
            const querySnap = await getDocs(q)

            let transactions = []
            querySnap.forEach((doc) => {
                // console.log(doc.data());
                return transactions.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            setTransactions(transactions)
        }
        catch (error) {
            console.log({error})
            toast.error("currently can't get your orders")
        }
        setLoading(false)
    }

    useEffect(() => {

        if(isMounted) {
            getTransactions().then()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, userId])

    return (
        <>
            {loading ?
                (<Spinner />) :
                (
                    <>
            <header className="border-bottom mb-4 pb-4">
                <Row>
                    <Col lg={5} className="col-6 me-auto">
                        <input type="text" placeholder="search" className="form-control"/>
                    </Col>
                    <Col lg={3} className="col-6">
                        <select className="form-select">
                            <option value="Method">Method</option>
                            <option value="Master card">Master card</option>
                            <option value="Visa Card">Visa card</option>
                            <option value="Paypal">Paypal </option>
                        </select>
                    </Col>

                </Row>
            </header>
            {transactions && transactions.length > 0 ? (
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
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="bold">#{transaction.id}</td>
                            <td>&#8358;{transaction.data.orderTotal.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                            <td>
                                <div className="icontext">
                                    <img width={36} src={MasterCard} className="icon border" alt="Payment"/>
                                    <span className="text text-muted">{transaction.data.paymentMethod}</span>
                                </div>
                            </td>
                            <td> {(transaction.data.timeStamp).toDate().toLocaleDateString("en-US")}</td>
                            <td className="text-end">
                                <button type='button' className="btn btn-light btn-analytics">Details </button>
                            </td>
                        </tr>
                    ))}

                        </tbody>
                    </Table>
                </div>
                ) : (
                    <div className="No-category">
                        <h5>Currently No Transactions </h5>
                        <img src={NotFoundImage} alt="" className="img-fluid"/>
                    </div>
                )
            }
        </>
    ) }
</>
    )

}
export default TransactionListPage
