import React from "react";
import "./pagesStyles.css"
import {Link} from "react-router-dom";
import {Card ,Col ,Row ,Table} from "react-bootstrap";

const OrderListPage = () => {
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Manage Orders </h2>
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
                                    {/*row one*/}
                                    <tr>
                                        <td>0901</td>
                                        <td className="bold">Marvin McKinney</td>
                                        <td>marvin@example.com</td>
                                        <td> &#8358; 56,780.00</td>
                                        <td> <span className="badge rounded-pill alert-warning">Pending</span> </td>
                                        <td>24.03.2022</td>
                                        <td className="text-end">
                                            <Link to="/dashboard/orders/6775" className="btn btn-light btn-analytics">Details </Link>
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

                                    {/*row two*/}
                                    <tr>
                                        <td>0456</td>
                                        <td className="bold">Leslie Alexander</td>
                                        <td>leslie@example.com</td>
                                        <td> &#8358; 90,780.00</td>
                                        <td> <span className="badge rounded-pill alert-warning">Pending</span> </td>
                                        <td>22.03.2022</td>
                                        <td className="text-end">
                                            <Link to="/dashboard/orders/6778" className="btn btn-light btn-analytics">Details </Link>
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


                                    {/*row one*/}
                                    <tr>
                                        <td>6789</td>
                                        <td className="bold">Esther Howard </td>
                                        <td>marvin@example.com</td>
                                        <td> &#8358; 76,780.00</td>
                                        <td> <span className="badge rounded-pill alert-danger">Canceled</span> </td>
                                        <td>20.03.2022</td>
                                        <td className="text-end">
                                            <Link to="/dashboard/orders/6789" className="btn btn-light btn-analytics">Details </Link>
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


                                    {/*row one*/}
                                    <tr>
                                        <td>6781</td>
                                        <td className="bold">Jenny Wilson</td>
                                        <td>marvin@example.com</td>
                                        <td> &#8358; 896,780.00</td>
                                        <td> <span className="badge rounded-pill alert-success">Success</span> </td>
                                        <td>18.03.2022</td>
                                        <td className="text-end">
                                            <Link to="/dashboard/orders/6781" className="btn btn-light btn-analytics">Details </Link>
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
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Card>
            </section>
            {/*<Link to="/dashboard/orders/7899"> Details</Link>*/}
        </>
    )

}
export default OrderListPage
