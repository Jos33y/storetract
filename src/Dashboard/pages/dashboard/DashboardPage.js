import React from "react";
import "../pagesStyles.css"
import {Card ,Col ,Row} from "react-bootstrap";
import Statistics from "./statistics";
import LatestOrders from "./latestOrders";


const DashboardPage = ({storeData}) => {

    return (
      <>
         <section className="content-main">
             <div className="content-header">
                 <h2 className="content-title"> Dashboard </h2>
                 <div>
                     <a target="_blank"  rel="noopener noreferrer" href={`/${storeData.storeUrl}`} className="btn btn-md btn-primary"><i
                         className="fas fa-external-link-alt"></i> View Store </a>
                 </div>
             </div>

             {/*dashboard cards*/}
             <Row>
                 {/*column one*/}
                 <Col lg={4}>
                     <Card className="card card-body mb-4">
                         <article className="icontext">
                             <span className="icon icon-sm rounded-circle bg-primary-light">
                                 <i className="fas fa-money-bill-alt text-primary"></i>
                             </span>
                             <div className="text">
                                 <h6 className="mb-1">Total Sales</h6>
                                 <span>&#8358; 19,626,058.20</span>
                             </div>
                         </article>
                     </Card>
                 </Col>
                 {/*column two*/}
                 <Col lg={4}>
                     <Card className="card-body mb-4">
                         <article className="icontext">
                             <span className="icon icon-sm rounded-circle bg-success-light">
                                <i className="fas fa-truck text-success"></i>
                             </span>
                             <div className="text">
                                 <h6 className="mb-1">Total Orders</h6>
                                 <span>87,790</span>
                             </div>
                         </article>
                     </Card>
                 </Col>

                 {/*column three*/}
                 <Col lg={4}>
                     <Card className="card-body mb-4">
                         <article className="icontext">
                             <span className="icon icon-sm rounded-circle bg-warning-light">
                                <i className="fas fa-shopping-basket text-warning"></i>
                             </span>
                             <div className="text">
                                 <h6 className="mb-1">Total Products</h6>
                                 <span>5,678</span>
                             </div>
                         </article>
                     </Card>
                 </Col>
             </Row>

             {/*dashboard statistics and reward points*/}
             <Statistics />
             {/*latest orders section*/}
             <LatestOrders storeUrl={storeData.storeUrl}/>
         </section>
      </>
  )
}

export default DashboardPage
