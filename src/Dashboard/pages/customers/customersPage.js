import React, {useEffect, useRef, useState} from "react";
import "../pagesStyles.css"
import {Link} from "react-router-dom";
import {Card ,Col ,Row ,Table} from "react-bootstrap";
import AvatarDefault from "../../../assets/images/avatardefault_92824.png"
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import Spinner from "../../../components/Spinner";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg";


const CustomersPage = ({storeUrl, userId}) => {

    const isMounted = useRef()
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)

    const getCustomers = async () => {
        setLoading(true)
        try {
            const getCustomersRef = collection(db, 'shops', storeUrl, 'customers')
            const q = query(getCustomersRef)
            const querySnap = await getDocs(q)

            let customers = []
            querySnap.forEach((doc) => {
                // console.log(doc.data());
                return customers.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            setCustomers(customers)
        }
        catch (error) {
            console.log({error})
            toast.error("currently can't get your orders")
        }
        setLoading(false)
    }

    useEffect(() => {

        if(isMounted) {
            getCustomers().then()
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
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Customers List</h2>
                </div>

                <Card className="card mb-4">
                    <header className="card-header">
                        <Row className="gx-3">
                            <Col lg={4} md={6} className="me-auto">
                                <input type="text" placeholder="Search..." className="form-control"/>
                            </Col>

                            <Col lg={4} md={6} className="col-6">
                                <select className="form-select">
                                    <option value="show 20">Show 20</option>
                                    <option value="show 20">Show 30</option>
                                    <option value="show 20">Show 40</option>
                                </select>
                            </Col>
                        </Row>
                    </header>
                    <div className="card-body">
                        {customers && customers.length > 0 ? (
                        <div className="table-responsive">
                            <Table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Registered</th>
                                        {/*<th className="text-end">Action</th>*/}
                                    </tr>
                                </thead>
                                <tbody>

                                {/*ROw two customer*/}
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td width="40%">
                                            <Link to={`/dashboard/customers/${customer.id}`} className="itemside">
                                                <div className="left">
                                                    <img src={AvatarDefault} className="img-sm img-avatar" alt="avatar"/>
                                                </div>
                                                <div className="info pl-3">
                                                    <h6 className="mb-0 title">{`${customer.data.firstname} ${customer.data.lastname}`}</h6>
                                                    <small className="text-muted">Customer ID: #{customer.data.customerId} </small>
                                                </div>
                                            </Link>
                                        </td>
                                        <td> {customer.data.email}</td>
                                        <td> <span className="badge rounded-pill alert-success">Active</span> </td>
                                        <td> {(customer.data.timeStamp).toDate().toLocaleDateString("en-US")}</td>
                                        {/*<td className="text-end">*/}
                                        {/*    <Link to={`/dashboard/customers/${customer.id}`} className="btn btn-light btn-analytics">View </Link>*/}
                                        {/*</td>*/}
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                        )
                        :
                        (
                        <div className="No-category">
                            <h5>Currently No Customers </h5>
                            <img src={NotFoundImage} alt="" className="img-fluid"/>
                        </div>
                        )
                        }
                    </div>
                </Card>
            </section>
                ) }
        </>
    )

}

export default CustomersPage
