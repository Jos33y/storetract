import {Card} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg";

const RecentWithdrawals = ({storeUrl, userId}) => {

    const isMounted = useRef()
    const [recentWithdraw, setRecentWithdraw] = useState(null)

    const getRecentWithdrawals = async () => {
        try {
            const getWithdrawalsRef = collection(db, 'shops', storeUrl, 'walletWithdrawalHistory')
            const q = query(getWithdrawalsRef, orderBy('timeStamp', 'desc'))
            const querySnap = await getDocs(q)

            let recentWithdraw = []
            querySnap.forEach((doc) => {
                return recentWithdraw.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            setRecentWithdraw(recentWithdraw)
        }
        catch (error) {
            console.log({error})
            toast.error("currently can't get your orders")
        }
    }

    useEffect(() => {
        if(isMounted) {
            getRecentWithdrawals().then()
        }
        return () => {
            isMounted.current = false;
        }
// eslint-disable-next-line
    },[isMounted, userId])
    return (
        <>
            <div className="recent-withdrawal">
                <Card className="card">
                    <div className="card-body">
                        <h5>Recent withdrawals</h5>
                        {recentWithdraw && recentWithdraw.length > 0 ? (
                        <table className="table">
                            <thead>
                            <th>id</th>
                            <th>transaction</th>
                            <th>amount</th>
                            <th>total deducted</th>
                            <th>status</th>
                            </thead>

                            <tbody>
                            {recentWithdraw.map((recent) => (
                            <tr key={recent.id}>
                                <td className="id"> {recent.data.withdrawalId}</td>
                                <td>
                                    <div className="info-details">
                                        <p className="text-bold">{recent.data.transactionRef}</p>
                                        <p>{(recent.data.timeStamp).toDate().toLocaleDateString("en-US")}</p>
                                    </div>
                                </td>
                                <td> &#8358;{recent.data.withdrawalAmount.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </td>
                                <td> &#8358;{recent.data.totalWithdraw.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </td>
                                <td><span className={`badge rounded-pill ${recent.data.status === 'Successful' ? 'alert-success' : 'alert-warning'}`}>{recent.data.status}</span> </td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                            )
                            :
                            (
                                <div className="No-category text-center">
                                    <h5>Currently No withdrawal</h5>
                                    <img src={NotFoundImage} alt="" className="img-fluid"/>
                                </div>
                            )
                        }
                    </div>
                </Card>
            </div>
        </>
    )
}
export default RecentWithdrawals