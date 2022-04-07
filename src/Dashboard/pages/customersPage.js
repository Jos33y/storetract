import React from "react";
import "./pagesStyles.css"
import {Link} from "react-router-dom";
import {Card ,Col ,Row ,Table} from "react-bootstrap";
import Avatar1 from "../../assets/images/sellers/avatar1.jpg"
import Avatar2 from "../../assets/images/sellers/avatar2.jpg"
import Avatar3 from "../../assets/images/sellers/avatar3.jpg"
import Avatar4 from "../../assets/images/sellers/avatar4.jpg"
import Avatar5 from "../../assets/images/sellers/lady2.jpg"
import Avatar6 from "../../assets/images/sellers/lady.jpg"


const CustomersPage = () => {

    return (
        <>
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
                            <Col lg={2} md={3} className="col-6">
                                <select className="form-select">
                                    <option value="status">Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Disabled">Disabled</option>
                                    <option value="Show all">Show all</option>
                                </select>
                            </Col>

                            <Col lg={2} md={3} className="col-6">
                                <select className="form-select">
                                    <option value="show 20">Show 20</option>
                                    <option value="show 20">Show 30</option>
                                    <option value="show 20">Show 40</option>
                                </select>
                            </Col>
                        </Row>
                    </header>
                    <div className="card-body">
                        <div className="table-responsive">
                            <Table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Registered</th>
                                        <th className="text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {/*ROw one customer*/}
                                    <tr>
                                        <td width="40%">
                                            <Link to="https://" className="itemside">
                                                <div className="left">
                                                    <img src={Avatar1} className="img-sm img-avatar" alt="avatar"/>
                                                </div>
                                                <div className="info pl-3">
                                                    <h6 className="mb-0 title">Eleanor Pena</h6>
                                                    <small className="text-muted">Customer ID: #469 </small>
                                                </div>
                                            </Link>
                                        </td>
                                        <td> eleanor2020@gmail.com</td>
                                        <td> <span className="badge rounded-pill alert-success">Active</span> </td>
                                        <td> 08.07.2021</td>
                                        <td className="text-end">
                                            <Link to="/dashboard/customers/439" className="btn btn-light btn-analytics">View </Link>
                                        </td>
                                    </tr>

                                {/*ROw two customer*/}
                                <tr>
                                    <td width="40%">
                                        <Link to="https://" className="itemside">
                                            <div className="left">
                                                <img src={Avatar2} className="img-sm img-avatar" alt="avatar"/>
                                            </div>
                                            <div className="info pl-3">
                                                <h6 className="mb-0 title">Mary Monasa</h6>
                                                <small className="text-muted">Customer ID: #129 </small>
                                            </div>
                                        </Link>
                                    </td>
                                    <td> marymonasa@gmail.com</td>
                                    <td> <span className="badge rounded-pill alert-success">Active</span> </td>
                                    <td> 08.07.2021</td>
                                    <td className="text-end">
                                        <Link to="/dashboard/customers/439" className="btn btn-light btn-analytics">View </Link>
                                    </td>
                                </tr>


                                {/*ROw three customer*/}
                                <tr>
                                    <td width="40%">
                                        <Link to="https://" className="itemside">
                                            <div className="left">
                                                <img src={Avatar3} className="img-sm img-avatar" alt="avatar"/>
                                            </div>
                                            <div className="info pl-3">
                                                <h6 className="mb-0 title">Jonathan Ive</h6>
                                                <small className="text-muted">Customer ID: #400 </small>
                                            </div>
                                        </Link>
                                    </td>
                                    <td> jonathanive@gmail.com</td>
                                    <td> <span className="badge rounded-pill alert-success">Active</span> </td>
                                    <td> 08.07.2021</td>
                                    <td className="text-end">
                                        <Link to="/dashboard/customers/439" className="btn btn-light btn-analytics">View </Link>
                                    </td>
                                </tr>


                                {/*ROw four customer*/}
                                <tr>
                                    <td width="40%">
                                        <Link to="https://" className="itemside">
                                            <div className="left">
                                                <img src={Avatar4} className="img-sm img-avatar" alt="avatar"/>
                                            </div>
                                            <div className="info pl-3">
                                                <h6 className="mb-0 title">Pablo Escobar</h6>
                                                <small className="text-muted">Customer ID: #789 </small>
                                            </div>
                                        </Link>
                                    </td>
                                    <td> pabloescobar@gmail.com</td>
                                    <td> <span className="badge rounded-pill alert-danger">Inactive</span> </td>
                                    <td> 08.07.2021</td>
                                    <td className="text-end">
                                        <Link to="/dashboard/customers/439" className="btn btn-light btn-analytics">View </Link>
                                    </td>
                                </tr>


                                {/*ROw five customer*/}
                                <tr>
                                    <td width="40%">
                                        <Link to="https://" className="itemside">
                                            <div className="left">
                                                <img src={Avatar5} className="img-sm img-avatar" alt="avatar"/>
                                            </div>
                                            <div className="info pl-3">
                                                <h6 className="mb-0 title">Nicolas Cage</h6>
                                                <small className="text-muted">Customer ID: #484 </small>
                                            </div>
                                        </Link>
                                    </td>
                                    <td> nicolascage@gmail.com</td>
                                    <td> <span className="badge rounded-pill alert-danger">Inactive</span> </td>
                                    <td> 08.07.2021</td>
                                    <td className="text-end">
                                        <Link to="/dashboard/customers/439" className="btn btn-light btn-analytics">View </Link>
                                    </td>
                                </tr>


                                {/*ROw six customer*/}
                                <tr>
                                    <td width="40%">
                                        <Link to="https://" className="itemside">
                                            <div className="left">
                                                <img src={Avatar6} className="img-sm img-avatar" alt="avatar"/>
                                            </div>
                                            <div className="info pl-3">
                                                <h6 className="mb-0 title">Jide Olajide</h6>
                                                <small className="text-muted">Customer ID: #407 </small>
                                            </div>
                                        </Link>
                                    </td>
                                    <td> iamjidson89@gmail.com</td>
                                    <td> <span className="badge rounded-pill alert-success">Active</span> </td>
                                    <td> 08.07.2021</td>
                                    <td className="text-end">
                                        <Link to="/dashboard/customers/439" className="btn btn-light btn-analytics">View </Link>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Card>
            </section>
        </>
    )

}

export default CustomersPage
