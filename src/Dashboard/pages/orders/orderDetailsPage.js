import React from "react";
import "../pagesStyles.css"
import {Button ,Card ,Col ,Row ,Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import ItemTwo from "../../../assets/images/items/2.jpg";
import VisaCard from "../../../assets/images/payments/2.png";

const OrderDetailsPage = () => {
    return (
        <>
           <section className="content-main">
               <div className="content-header">
                   <h2 className="content-title">Order detail </h2>
               </div>

               <Card>
                   <header className="card-header">
                       <Row className="align-items-center">
                           <Col lg={6} md={6}>
                               <i className="fas fa-calendar-day"></i>
                               <span className="bold"> Wed, Mar 13, 2022, 4:32pm</span> <br/>
                               <small className="text-muted">Order ID: 3453012</small>
                           </Col>
                           <Col lg={6} md={6} className="ms-auto text-md-end">
                               <select style={{maxWidth: "200px"}} className="form-select d-inline-block">
                                   <option value="change status">Change Status</option>
                                   <option value="awaiting payment">Awaiting Payment</option>
                                   <option value="confirmed">Confirmed</option>
                                   <option value="shipped">Shipped</option>
                                   <option value="Delivered">Delivered</option>
                               </select>
                               <Link to="https://" className="btn btn-md btn-outline-secondary ms-2">Save </Link>
                               <Link to="https://" className="btn btn-secondary ms-2"> <i className="fas fa-print"></i></Link>
                           </Col>
                       </Row>
                   </header>
                   <div className="card-body">
                       <Row className="mb-5 order-info-wrap">
                           <Col md={4}>
                               <article className="icontext align-items-start">
                                   <span className="icon icon-sm rounded-circle bg-primary-light">
                                        <i className="fas fa-user text-primary"></i>
                                   </span>
                                   <div className="text">
                                       <h6 className="mb-1">Customer</h6>
                                       <p className="mb-1">
                                           John Alexander <br/>
                                           alex@example.com <br/>
                                           +234 70 897 6767
                                       </p>
                                       <Link to="dashboard/customers/678"> View Profile</Link>
                                   </div>
                               </article>
                           </Col>
                           <Col md={4}>
                               <article className="icontext align-items-start">
                                   <span className="icon icon-sm rounded-circle bg-primary-light">
                                        <i className="fas fa-truck-moving text-primary"></i>
                                   </span>
                                   <div className="text">
                                       <h6 className="mb-1">Order info</h6>
                                       <p className="mb-1">
                                           Shipping: Fargo express <br/>
                                           Pay method: card <br/>
                                           Status: new
                                       </p>
                                       <Link to="dashboard/customers/678"> Download Info</Link>
                                   </div>

                               </article>

                           </Col>

                           <Col md={4}>
                               <article className="icontext align-items-start">
                                   <span className="icon icon-sm rounded-circle bg-primary-light">
                                        <i className="fas fa-map-marker text-primary"></i>
                                   </span>
                                   <div className="text">
                                       <h6 className="mb-1">Deliver to</h6>
                                       <p className="mb-1">
                                           City: Tashkent, Uzbekistan<br/>
                                           Block A, House 123, Floor 2 <br/>
                                           Po Box 10000
                                       </p>
                                       <Link to="dashboard/customers/678"> View Profile</Link>
                                   </div>
                               </article>
                           </Col>
                       </Row>

                       <Row>
                           <Col lg={8}>
                               <div className="table-responsive">
                                   <Table className="table-border table-hover table-lg">
                                       <thead>
                                        <tr>
                                            <th width="40%">Product</th>
                                            <th width="20%">Unit Price</th>
                                            <th width="20%">Quantity</th>
                                            <th width="20%">Total</th>
                                        </tr>
                                       </thead>
                                       <tbody>
                                       {/*row one*/}
                                        <tr>
                                            <td>
                                                <Link to="https://" className="itemside">
                                                    <div className="left">
                                                        <img src={ItemTwo} alt="item" width={40} height={40} className="img-xs"/>
                                                    </div>
                                                    <div className="info">T-shirt blue XXL size</div>

                                                </Link>
                                            </td>
                                            <td> &#8358; 56,000.00</td>
                                            <td> 2 </td>
                                            <td className="text-end"> &#8358; 134,000</td>
                                        </tr>

                                       {/*row one*/}
                                       <tr>
                                           <td>
                                               <Link to="https://" className="itemside">
                                                   <div className="left">
                                                       <img src={ItemTwo} alt="item" width={40} height={40} className="img-xs"/>
                                                   </div>
                                                   <div className="info">Winter Jacket for Men</div>

                                               </Link>
                                           </td>
                                           <td> &#8358; 26,000.00</td>
                                           <td> 2 </td>
                                           <td className="text-end"> &#8358; 54,000</td>
                                       </tr>


                                       {/*row one*/}
                                       <tr>
                                           <td>
                                               <Link to="https://" className="itemside">
                                                   <div className="left">
                                                       <img src={ItemTwo} alt="item" width={40} height={40} className="img-xs"/>
                                                   </div>
                                                   <div className="info">Jeans wear for men</div>

                                               </Link>
                                           </td>
                                           <td> &#8358; 16,000.00</td>
                                           <td> 3 </td>
                                           <td className="text-end"> &#8358; 48,000</td>
                                       </tr>


                                       {/*row one*/}
                                       <tr>
                                           <td>
                                               <Link to="https://" className="itemside">
                                                   <div className="left">
                                                       <img src={ItemTwo} alt="item" width={40} height={40} className="img-xs"/>
                                                   </div>
                                                   <div className="info">Designer Bag </div>

                                               </Link>
                                           </td>`
                                           <td> &#8358; 2,000.00</td>
                                           <td> 4 </td>
                                           <td className="text-end"> &#8358; 8,000</td>
                                       </tr>
                                       <tr>
                                           <td colSpan={4}>
                                               <article className="float-end">
                                                   <dl className="dlist">
                                                       <dt>Subtotal: </dt> <dd> &#8358; 456,000.00</dd>
                                                   </dl>
                                                   <dl className="dlist">
                                                       <dt>Shipping cost: </dt> <dd> &#8358; 6,000.00</dd>
                                                   </dl>

                                                   <dl className="dlist">
                                                       <dt>Grand total: </dt> <dd> &#8358; 462,000.00</dd>
                                                   </dl>
                                                   <dl className="dlist">
                                                       <dt className="text-muted">Status </dt>
                                                       <dd>
                                                           <span className="badge rounded-pill alert-success text-success">Payment done
                                                           </span> </dd>
                                                   </dl>
                                               </article>
                                           </td>
                                       </tr>
                                       </tbody>
                                   </Table>
                               </div>
                           </Col>
                           <Col lg={4}>
                               <div className="box shadow-sm bg-light">
                                   <h6>Payment info</h6>
                                   <p>
                                       <img src={VisaCard} alt="card" className="border" height={20}/> Master Card **** **** 4768 <br/>
                                       Business name: Grand Market LLC <br/>
                                       Phone: +1 (708) 555-7865
                                   </p>
                               </div>
                               <div className="h-25 pt-4">
                                   <div className="mb-3">
                                       <label htmlFor="notes">Notes</label>
                                       <textarea name="notes" id="notes" className="form-control" placeholder="Type some note"></textarea>
                                   </div>
                                   <Button className="btn btn-primary">Save note</Button>
                               </div>
                           </Col>
                       </Row>
                   </div>
               </Card>
           </section>

        </>
    )

}
export default OrderDetailsPage
