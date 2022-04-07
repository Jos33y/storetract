import React from "react";
import "./pagesStyles.css";
import {Link} from "react-router-dom";
import {Button ,Card ,Col ,Form ,Row} from "react-bootstrap";

const AddProductPage = () => {

    return (
        <>
            <section className="content-main" style={{width: "720px"}}>
                <div className="content-header">
                    <h2 className="content-title"> Create Product</h2>
                    <div>
                        <Link to="/dashboard/home" className="btn btn-md btn-outline-danger"><i
                            className="fas fa-external-link-alt"></i> Discard</Link>
                    </div>
                </div>

                <Card className="card mb-4">
                    <div className="card-body">
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="product-name" className="form-label">Product title  </label>
                                <input type="text" placeholder="Type here..." className="form-control" id="product_name" required/>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="full description" className="form-label">Product description  </label>
                                <textarea name="description" className="form-control" placeholder="Type here..." id="product_description"  rows="4" required></textarea>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="product-images" className="form-label">Product Images  </label>
                                <input type="file"  className="form-control"  required/>
                            </div>

                            <Row className="gx-2">
                                <Col sm={6} className="mb-4">
                                    <label className="form-label" htmlFor="category">Category</label>
                                    <select name="category" className="form-select" id="productCategory">
                                        <option value="Automobiles">Automobiles</option>
                                        <option value="Home items">Home items</option>
                                        <option value="Electronics"> Electronics</option>
                                        <option value="Smartphones"> Smart Phones</option>
                                        <option value="Sport items">Sport Items</option>
                                        <option value="Baby and Too">Baby and Too</option>
                                    </select>
                                </Col>

                                <Col sm={6} className="mb-4">
                                    <label htmlFor="product-tag" className="form-label">Product Tags  </label>
                                    <input type="text" className="form-control" id="product_tag"/>
                                </Col>
                            </Row>

                            <Row className="gx-2">
                                <Col sm={6} className="mb-4">
                                    <label htmlFor="product-price" className="form-label">Product Price (&#8358;)  </label>
                                    <input type="number" className="form-control" id="product_price"/>
                                </Col>

                                <Col sm={6} className="mb-4">
                                    <label htmlFor="product-disc-price" className="form-label">Product Discount Price (&#8358;)  </label>
                                    <input type="number" className="form-control" id="product_discount_price"/>
                                </Col>
                            </Row>

                            <div className="mb-4">
                                <Button className="btn btn-md btn-primary">Save Product</Button>
                            </div>

                        </Form>
                    </div>
                </Card>
            </section>
        </>
    )

}

export default AddProductPage


