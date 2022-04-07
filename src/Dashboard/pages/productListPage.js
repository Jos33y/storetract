import React from "react";
import {Link} from "react-router-dom";
import "./pagesStyles.css"
import {Card ,Col ,Row} from "react-bootstrap";
import ItemOne from "../../assets/images/items/1.jpg";
import ItemTwo from "../../assets/images/items/2.jpg";
import ItemThree from "../../assets/images/items/3.jpg";
import ItemFour from "../../assets/images/items/4.jpg";
import ItemFive from "../../assets/images/items/5.jpg";
import ItemSix from "../../assets/images/items/6.jpg";
import ItemSeven from "../../assets/images/items/7.jpg";
import ItemEight from "../../assets/images/items/8.jpg";
import ItemNine from "../../assets/images/items/9.jpg";
import ItemTen from "../../assets/images/items/10.jpg";




const ProductListPage = () => {
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Manage Products </h2>
                    <div>
                        <Link to="/dashboard/add-product" className="btn btn-primary"> Create New</Link>
                    </div>
                </div>

                <Card className="card mb-4">
                    <header className="card-header">
                        <Row className="gx-3">
                            <Col lg={4} md={6} className="me-auto">
                                <input type="text" placeholder="Search..." className="form-control"/>
                            </Col>
                            <Col lg={2} md={3} className="col-6">
                                <select className="form-select">
                                    <option value="status">All category</option>
                                    <option value="Active">Electronics</option>
                                    <option value="Disabled">Clothings</option>
                                    <option value="Show all">Others</option>
                                </select>
                            </Col>

                            <Col lg={2} md={3} className="col-6">
                                <select className="form-select">
                                    <option value="show 20">Latest added</option>
                                    <option value="show 20">Cheap first</option>
                                    <option value="show 20">Most viewed</option>
                                </select>
                            </Col>
                        </Row>
                    </header>
                    <div className="card-body">
                        <Row className="gx-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5">
                            {/*column one*/}
                            <Col className="col">
                                <Card className="card card-product-grid">
                                    <Link to="https://"  className="link img-wrap">
                                        <img src={ItemOne} alt="Product"/>
                                    </Link>
                                    <div className="info-wrap">
                                        <span className="title text-truncate"> Just another product name</span>
                                        <div className="price mb-2">&#8358; 5,000.00</div>
                                        <Link data-bs-toggle="dropdown" to="/dashboard/add-product" className="btn btn-sm btn-outline-secondary"><i
                                            className="fas fa-edit"></i> Edit</Link>
                                        <Link to="/dashboard/add-product"  className="btn btn-sm btn-outline-danger ms-2"> <i
                                            className="fas fa-trash-alt"></i> Delete </Link>
                                    </div>
                                </Card>
                            </Col>

                            {/*column two*/}
                            <Col className="col">
                                <Card className="card card-product-grid">
                                    <Link to="https://"  className="link img-wrap">
                                        <img src={ItemTwo} alt="Product"/>
                                    </Link>
                                    <div className="info-wrap">
                                        <span className="title text-truncate"> Brow winter Jacket for Men</span>
                                        <div className="price mb-2">&#8358; 5,000.00</div>
                                        <Link data-bs-toggle="dropdown" to="/dashboard/add-product" className="btn btn-sm btn-outline-secondary"><i
                                            className="fas fa-edit"></i> Edit</Link>
                                        <Link to="/dashboard/add-product"  className="btn btn-sm btn-outline-danger ms-2"> <i
                                            className="fas fa-trash-alt"></i> Delete </Link>
                                    </div>
                                </Card>
                            </Col>

                            {/*column one*/}
                            <Col className="col">
                                <Card className="card card-product-grid">
                                    <Link to="https://"  className="link img-wrap">
                                        <img src={ItemThree} alt="Product"/>
                                    </Link>
                                    <div className="info-wrap">
                                        <span className="title text-truncate"> Jeans short new model</span>
                                        <div className="price mb-2">&#8358; 5,000.00</div>
                                        <Link data-bs-toggle="dropdown" to="/dashboard/add-product" className="btn btn-sm btn-outline-secondary"><i
                                            className="fas fa-edit"></i> Edit</Link>
                                        <Link to="/dashboard/add-product"  className="btn btn-sm btn-outline-danger ms-2"> <i
                                            className="fas fa-trash-alt"></i> Delete </Link>
                                    </div>
                                </Card>
                            </Col>


                            {/*column one*/}
                            <Col className="col">
                                <Card className="card card-product-grid">
                                    <Link to="https://"  className="link img-wrap">
                                        <img src={ItemFour} alt="Product"/>
                                    </Link>
                                    <div className="info-wrap">
                                        <span className="title text-truncate"> Travel Bag XL</span>
                                        <div className="price mb-2">&#8358; 5,000.00</div>
                                        <Link data-bs-toggle="dropdown" to="/dashboard/add-product" className="btn btn-sm btn-outline-secondary"><i
                                            className="fas fa-edit"></i> Edit</Link>
                                        <Link to="/dashboard/add-product"  className="btn btn-sm btn-outline-danger ms-2"> <i
                                            className="fas fa-trash-alt"></i> Delete </Link>
                                    </div>
                                </Card>
                            </Col>


                            {/*column one*/}
                            <Col className="col">
                                <Card className="card card-product-grid">
                                    <Link to="https://"  className="link img-wrap">
                                        <img src={ItemFive} alt="Product"/>
                                    </Link>
                                    <div className="info-wrap">
                                        <span className="title text-truncate"> Just another product here</span>
                                        <div className="price mb-2">&#8358; 5,000.00</div>
                                        <Link data-bs-toggle="dropdown" to="/dashboard/add-product" className="btn btn-sm btn-outline-secondary"><i
                                            className="fas fa-edit"></i> Edit</Link>
                                        <Link to="/dashboard/add-product"  className="btn btn-sm btn-outline-danger ms-2"> <i
                                            className="fas fa-trash-alt"></i> Delete </Link>
                                    </div>
                                </Card>
                            </Col>

                            {/*column one*/}
                            <Col className="col">
                                <Card className="card card-product-grid">
                                    <Link to="https://"  className="link img-wrap">
                                        <img src={ItemSix} alt="Product"/>
                                    </Link>
                                    <div className="info-wrap">
                                        <span className="title text-truncate"> Just another product again</span>
                                        <div className="price mb-2">&#8358; 5,000.00</div>
                                        <Link data-bs-toggle="dropdown" to="/dashboard/add-product" className="btn btn-sm btn-outline-secondary"><i
                                            className="fas fa-edit"></i> Edit</Link>
                                        <Link to="/dashboard/add-product"  className="btn btn-sm btn-outline-danger ms-2"> <i
                                            className="fas fa-trash-alt"></i> Delete </Link>
                                    </div>
                                </Card>
                            </Col>

                            {/*column one*/}
                            <Col className="col">
                                <Card className="card card-product-grid">
                                    <Link to="https://"  className="link img-wrap">
                                        <img src={ItemSeven} alt="Product"/>
                                    </Link>
                                    <div className="info-wrap">
                                        <span className="title text-truncate"> Just another product here again</span>
                                        <div className="price mb-2">&#8358; 5,000.00</div>
                                        <Link data-bs-toggle="dropdown" to="/dashboard/add-product" className="btn btn-sm btn-outline-secondary"><i
                                            className="fas fa-edit"></i> Edit</Link>
                                        <Link to="/dashboard/add-product"  className="btn btn-sm btn-outline-danger ms-2"> <i
                                            className="fas fa-trash-alt"></i> Delete </Link>
                                    </div>
                                </Card>
                            </Col>


                            {/*column one*/}
                            <Col className="col">
                                <Card className="card card-product-grid">
                                    <Link to="https://"  className="link img-wrap">
                                        <img src={ItemEight} alt="Product"/>
                                    </Link>
                                    <div className="info-wrap">
                                        <span className="title text-truncate"> Just another product eight</span>
                                        <div className="price mb-2">&#8358; 5,000.00</div>
                                        <Link data-bs-toggle="dropdown" to="/dashboard/add-product" className="btn btn-sm btn-outline-secondary"><i
                                            className="fas fa-edit"></i> Edit</Link>
                                        <Link to="/dashboard/add-product"  className="btn btn-sm btn-outline-danger ms-2"> <i
                                            className="fas fa-trash-alt"></i> Delete </Link>
                                    </div>
                                </Card>
                            </Col>



                            {/*column one*/}
                            <Col className="col">
                                <Card className="card card-product-grid">
                                    <Link to="https://"  className="link img-wrap">
                                        <img src={ItemNine} alt="Product"/>
                                    </Link>
                                    <div className="info-wrap">
                                        <span className="title text-truncate"> Just another product name</span>
                                        <div className="price mb-2">&#8358; 5,000.00</div>
                                        <Link data-bs-toggle="dropdown" to="/dashboard/add-product" className="btn btn-sm btn-outline-secondary"><i
                                            className="fas fa-edit"></i> Edit</Link>
                                        <Link to="/dashboard/add-product"  className="btn btn-sm btn-outline-danger ms-2"> <i
                                            className="fas fa-trash-alt"></i> Delete </Link>
                                    </div>
                                </Card>
                            </Col>



                            {/*column one*/}
                            <Col className="col">
                                <Card className="card card-product-grid">
                                    <Link to="https://"  className="link img-wrap">
                                        <img src={ItemTen} alt="Product"/>
                                    </Link>
                                    <div className="info-wrap">
                                        <span className="title text-truncate"> Just another product name</span>
                                        <div className="price mb-2">&#8358; 5,000.00</div>
                                        <Link data-bs-toggle="dropdown" to="/dashboard/add-product" className="btn btn-sm btn-outline-secondary"><i
                                            className="fas fa-edit"></i> Edit</Link>
                                        <Link to="/dashboard/add-product"  className="btn btn-sm btn-outline-danger ms-2"> <i
                                            className="fas fa-trash-alt"></i> Delete </Link>
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        <nav className="float-end mt-4" aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item disabled">
                                    <Link to="https://" className="page-link">Previous</Link>
                                </li>
                                <li className="page-item active">
                                    <Link to="https://" className="page-link">1</Link>
                                </li>
                                <li className="page-item">
                                    <Link to="https://" className="page-link">2</Link>
                                </li>
                                <li className="page-item">
                                    <Link to="https://" className="page-link">3</Link>
                                </li>
                                <li className="page-item disabled">
                                    <Link to="https://" className="page-link">Next</Link>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </Card>
            </section>
            {/*<Link to="/dashboard/products/7899"> Details</Link>*/}
        </>
    )

}
export default ProductListPage
