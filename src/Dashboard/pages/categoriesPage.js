import React from "react";
import "./pagesStyles.css";
import {Link} from "react-router-dom";
import {Button ,Card ,Col ,Form ,Row ,Table} from "react-bootstrap";

const CategoriesPage = () => {

    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Categories </h2>
                </div>

                <Card className="card">
                    <div className="card-body">
                        <Row>
                            <Col md={4}>
                                <Form>
                                    <div className="mb-4">
                                        <label htmlFor="category_name" className="form-label"> Category Name</label>
                                        <input type="text" placeholder="Type here" className="form-control" id="category_name"/>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="category_slug" className="form-label"> Category Slug</label>
                                        <input type="text" placeholder="Type here" className="form-control" id="category_slug"/>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="category_description" className="form-label"> Category Description</label>
                                        <textarea placeholder="Type here" rows={4} className="form-control" id="category_desc"></textarea>
                                    </div>

                                    <div className="d-grid">
                                        <Button className="btn btn-md btn-primary">Create category</Button>
                                    </div>
                                </Form>
                            </Col>
                            <Col md={8}>
                                <Table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" value=""/>
                                                </div>
                                            </th>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Slug</th>
                                            <th>Order</th>
                                            <th className="text-end"> Action </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {/*row one*/}
                                        <tr>
                                            <td>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" value=""/>
                                                </div>
                                            </td>
                                            <td>21</td>
                                            <td className="bold">Women Fashion</td>
                                            <td>Fashion for womens</td>
                                            <td>/women</td>
                                            <td>2</td>
                                            <td className="text-end">
                                                <div className="dropdown">
                                                    <Link to="#" data-bs-toggle="dropdown" class="btn btn-outline-secondary">
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
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value=""/>
                                            </div>
                                        </td>
                                        <td>31</td>
                                        <td className="bold">Kids Clothes</td>
                                        <td>Clothes for Kids</td>
                                        <td>/kids</td>
                                        <td>3</td>
                                        <td className="text-end">
                                            <div className="dropdown">
                                                <Link to="#" data-bs-toggle="dropdown" class="btn btn-outline-secondary">
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
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value=""/>
                                            </div>
                                        </td>
                                        <td>21</td>
                                        <td className="bold">Hot gifts</td>
                                        <td>Hot Gifts</td>
                                        <td>/gifts</td>
                                        <td>4</td>
                                        <td className="text-end">
                                            <div className="dropdown">
                                                <Link to="#" data-bs-toggle="dropdown" class="btn btn-outline-secondary">
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
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value=""/>
                                            </div>
                                        </td>
                                        <td>61</td>
                                        <td className="bold">Electronics</td>
                                        <td>Electronics</td>
                                        <td>/electronic</td>
                                        <td>5</td>
                                        <td className="text-end">
                                            <div className="dropdown">
                                                <Link to="#" data-bs-toggle="dropdown" class="btn btn-outline-secondary">
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
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value=""/>
                                            </div>
                                        </td>
                                        <td>78</td>
                                        <td className="bold">Accessories</td>
                                        <td>Accessories</td>
                                        <td>/accessories</td>
                                        <td>6</td>
                                        <td className="text-end">
                                            <div className="dropdown">
                                                <Link to="#" data-bs-toggle="dropdown" class="btn btn-outline-secondary">
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

                            </Col>
                        </Row>
                    </div>
                </Card>

            </section>

            </>
    )

}

export default CategoriesPage
