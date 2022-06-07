import {Card, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg";

const LatestOrders = ({storeUrl}) => {

    const isMounted = useRef()
    const [orders, setOrders] = useState([])

    const getLatestOrders = async () => {

        try {
            const getOrdersRef = collection(db, 'shops', storeUrl, 'orders')
            const q = query(getOrdersRef)
            const querySnap = await getDocs(q)

            let orders = []
            querySnap.forEach((doc) => {
                // console.log(doc.data());
                return orders.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            setOrders(orders)
        }
        catch (error) {
            console.log({error})
            toast.error("currently can't get your orders")
        }

    }

    useEffect(() => {

        if(isMounted) {
            getLatestOrders().then()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return(
        <>
            <Card className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Latest Orders</h5>

                    {orders && orders.length > 0 ? (
                        <>
                    <div className="table-responsive max-table">
                        <Table className="table table-hover">
                            <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th className="text-end">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/*row three */}
                            {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.data.orderId}</td>
                                <td className="bold">{order.data.firstname} {order.data.lastname}</td>
                                <td>{order.data.email}</td>
                                <td>&#8358;{order.data.orderTotal.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                <td> <span className={`badge rounded-pill ${ order.data.deliveryStatus === "Payment Successful" ? ('alert-success') : 'alert-danger'}`}>{order.data.deliveryStatus}</span> </td>
                                <td> {(order.data.timeStamp).toDate().toLocaleDateString("en-US")}</td>
                                <td className="text-end">
                                    <Link to={`/dashboard/orders/${order.id}`} className="btn btn-light btn-analytics">Details </Link>
                                </td>
                            </tr>
                            ))}

                            </tbody>
                        </Table>
                    </div>
                        <div className="mini-table">
                            <table className="table table-hover">
                                <tbody>
                                {orders.map((order) => (

                                <tr key={order.id}>
                                    <td>
                                        <Link to={`/dashboard/orders/${order.id}`} className="order-details">
                                            <h5>{order.data.firstname} {order.data.lastname}</h5>
                                            <h6>{order.data.email}</h6>
                                            <p>{order.data.orderId}</p>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/orders/${order.id}`} className="order-payment-details">
                                            <h5>&#8358;{order.data.orderTotal.toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
                                            <span className={`badge rounded-pill ${ order.data.deliveryStatus === "Payment Successful" ? ('alert-success') : 'alert-danger'}`}>{order.data.deliveryStatus}</span>
                                            <p>{(order.data.timeStamp).toDate().toLocaleDateString("en-US")}</p>
                                        </Link>

                                    </td>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
</>
                        )
                        :
                        (
                            <div className="No-category">
                                <h5>Currently No Orders</h5>
                                <img src={NotFoundImage} alt="" className="img-fluid"/>
                            </div>
                        )
                    }
                </div>
            </Card>
        </>
    )

}
export default LatestOrders