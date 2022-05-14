import {Card, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg";

const LatestOrders = ({storeUrl}) => {

    const [orders, setOrders] = useState([])

    const getLatestOrders = async () => {

        try {
            const getOrdersRef = collection(db, 'shops', 'johnson-enterprises', 'orders')
            const q = query(getOrdersRef)
            const querySnap = await getDocs(q)

            let orders = []
            querySnap.forEach((doc) => {
                console.log(doc.data());
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

        getLatestOrders().then()

    }, [])

    return(
        <>
            <Card className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Latest Orders</h5>

                    {orders && orders.length > 0 ? (
                    <div className="table-responsive">
                        <Table className="table table-hover">
                            <tbody>
                            {/*row one */}
                            <tr>
                                <td>2323</td>
                                <td className="bold">Devon Lane</td>
                                <td>devon@example.com</td>
                                <td>&#8358;45,000.00</td>
                                <td> <span className="badge rounded-pill alert-success">Delivered</span> </td>
                                <td> 01-03-2022</td>
                                <td className="text-end">
                                    <Link to="https://" className="btn btn-light btn-analytics">Details </Link>
                                    <div className="dropdown">
                                        <Link to="#" data-bs-toggle="dropdown" class="btn btn-light btn-analytics">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </Link>
                                        <div className="dropdown-menu">
                                            <Link to="#" className="dropdown-item"> View details</Link>
                                            <Link to="#" className="dropdown-item"> Edit info</Link>
                                            <Link to="#" className="dropdown-item text-danger"> Delete</Link>
                                        </div>
                                    </div> {/* dropdown ends*/}
                                </td>
                            </tr>

                            {/*row two */}
                            <tr>
                                <td>2545</td>
                                <td className="bold">Stewie Family Guy</td>
                                <td>stewie@gmail.com</td>
                                <td>&#8358;89,056.00</td>
                                <td> <span className="badge rounded-pill alert-warning">Pending</span> </td>
                                <td> 02-03-2022</td>
                                <td className="text-end">
                                    <Link to="https://" className="btn btn-light btn-analytics">Details </Link>
                                    <div className="dropdown">
                                        <Link to="#" data-bs-toggle="dropdown" class="btn btn-light btn-analytics">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </Link>
                                        <div className="dropdown-menu">
                                            <Link to="#" className="dropdown-item"> View details</Link>
                                            <Link to="#" className="dropdown-item"> Edit info</Link>
                                            <Link to="#" className="dropdown-item text-danger"> Delete</Link>
                                        </div>
                                    </div> {/* dropdown ends*/}
                                </td>
                            </tr>

                            {/*row three */}
                            {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.data.orderId}</td>
                                <td className="bold">{order.data.firstname} {order.data.lastname}</td>
                                <td>{order.data.email}</td>
                                <td>&#8358;{order.data.orderTotal}</td>
                                <td> <span className="badge rounded-pill alert-warning">{order.data.deliveryStatus}</span> </td>
                                <td> {(order.data.timeStamp).toDate()}</td>
                                <td className="text-end">
                                    <Link to="https://" className="btn btn-light btn-analytics">Details </Link>
                                    <div className="dropdown">
                                        <Link to="#" data-bs-toggle="dropdown" class="btn btn-light btn-analytics">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </Link>
                                        <div className="dropdown-menu">
                                            <Link to="#" className="dropdown-item"> View details</Link>
                                            <Link to="#" className="dropdown-item"> Edit info</Link>
                                            <Link to="#" className="dropdown-item text-danger"> Delete</Link>
                                        </div>
                                    </div> {/* dropdown ends*/}
                                </td>
                            </tr>
                            ))}

                            </tbody>
                        </Table></div>

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