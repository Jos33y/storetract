import React from "react";
import {Link} from "react-router-dom";
import {Button ,Card ,Col ,Row} from "react-bootstrap";
import Brand from "../../../assets/images/brands/brand.jpg"
import MapImg from "../../../assets/images/dashimages/map.jpg"

const CustomerDetails = () => {

    return(
        <>
           <section className="content-main">
               <div className="content-header">
                   <Link to="/dashboard/customers" className="btn btn-light btn-analytics"><i
                       className="fas fa-arrow-left"></i> Go back </Link>
               </div>
               <Card className="card mb-4">
                   <div className="card-header bg-warning" style={{height: "150px"}}>

                   </div>
                   <div className="card-body">
                       <Row>
                           <Col className="col-xl col-lg flex-grow-0" style={{flexBasis: "230px"}} >
                               <div className="img-thumbnail shadow w-100 bg-white position-relative text-center" style={{height: "190px", width: "200px", marginTop: "-120px"}} >
                                   <img src={Brand} className="center-xy img-fluid" alt="brand"/>
                               </div>
                           </Col>
                           <Col className="col-xl col-lg">
                               <h3>Adidas Sports Shop</h3>
                               <p>3891 Ranchview Dr. Richardson, California 62639</p>

                           </Col>
                           <Col xl={4} className="text-md-end">
                               <select className="form-select w-auto d-inline-block">
                                   <option value="actions">Actions</option>
                                   <option value="delete customers">Delete customers</option>
                                   <option value="Analyze">analyze </option>
                                   <option value="something">Something</option>
                               </select>
                           </Col>
                       </Row>
                       <hr className="my-4" />
                           <Row className="g-4">
                               <Col md={12} lg={4} xl={2}>
                                   <article className="box">
                                       <p className="mb-0 text-muted"> Total sales: </p>
                                       <h5 className="text-success"> 238 </h5>
                                       <p className="mb-0 text-muted">Revenue: </p>
                                       <h5 className="text-success mb-0"> &#8358; 56,789.00</h5>
                                   </article>
                               </Col>
                               <Col sm={6} lg={4} xl={3}>
                                   <h6>Contacts</h6>
                                   <p>
                                       Manager: Jerome Bell <br/>
                                       info@jerome.com <br/>
                                       +2347098765456
                                   </p>
                               </Col>
                               <Col sm={6} lg={4} xl={3}>
                                   <h6>Address</h6>
                                   <p>
                                       Country: California <br/>
                                       Address: Ranchview Dr. Richardson<br/>
                                       Postal Code: 62639
                                   </p>
                               </Col>
                               <Col sm={6} xl={4} className="text-xl-end">
                                   <map className="mapbox position-relative d-inline-block">
                                       <img src={MapImg} alt="map" className="rounded" height={120}/>
                                       <span className="map-pin" style={{top: "50px", left: "100px"}}></span>
                                       <Button className="btn btn-sm btn-light position-absolute bottom-0 end-0 m-2"> Large </Button>
                                   </map>

                               </Col>
                           </Row>
                   </div>
               </Card>
           </section>
        </>
    )

}

export default CustomerDetails
