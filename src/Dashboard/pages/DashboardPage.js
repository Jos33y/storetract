import React from "react";
import "./pagesStyles.css"
import {Link} from "react-router-dom";
import {Card ,Col ,Row ,Table} from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const data = {
    labels,
    datasets: [
        {
            label: 'Sales',
            data: [18, 17, 4, 3, 2, 20, 25, 31, 25, 22, 20, 9],
            backgroundColor: 'rgb(44, 120, 220)',
        },
        {
            label: 'Visitors',
            data: [40, 20, 17, 9, 23, 35, 39, 30, 34, 25, 27, 17],
            backgroundColor: 'rgb(180, 200, 230)',
        },
    ],
};
const DashboardPage = () => {




    return (
      <>
         <section className="content-main">
             <div className="content-header">
                 <h2 className="content-title"> Dashboard </h2>
                 <div>
                     <Link to="/johnson-enterprises" className="btn btn-md btn-primary"><i
                         className="fas fa-external-link-alt"></i> View Store </Link>
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
             <Row>
                 {/*statistics section*/}
                 <Col xl={8} lg={12}>
                     <Card className="card mb-4">
                         <article className="card-body">
                             <h5 className="card-title">Sales statistics</h5>
                             <Bar style={{height: "500px", width: "100%"}} options={options} data={data} />
                         </article>
                     </Card>
                 </Col>

                 <Col xl={4} lg={12}>
                     <Card className="card mb-4">
                         <article className="card-body">
                             <h5 className="card-title">Marketing</h5>
                             <span className="text-muted">Facebook page</span>
                             <div className="progress mb-3">
                                 <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "15%"}}>15%</div>
                             </div>

                             <span className="text-muted">Instagram page</span>
                             <div className="progress mb-3">
                                 <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "65%"}}>65%</div>
                             </div>

                             <span className="text-muted">Google search</span>
                             <div className="progress mb-3">
                                 <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: "51%"}}>51%</div>
                             </div>

                             <span className="text-muted">Other links</span>
                             <div className="progress mb-3">
                                 <div className="progress-bar progress-bar-striped bg-secondary" role="progressbar" style={{width: "80%"}}>80%</div>
                             </div>
                             <br/>
                             <Link to="https://" className="btn btn-light btn-analytics"> Open analytics <i className="fas fa-external-link-alt"></i> </Link>
                         </article>
                     </Card>
                 </Col>
             </Row>

             {/*latest orders section*/}
             <Card className="card mb-4">
                 <div className="card-body">
                     <h5 className="card-title">Latest Orders</h5>
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
                             <tr>
                                 <td>6589</td>
                                 <td className="bold">Steve Hardy</td>
                                 <td>thesteveshow@mysite.com</td>
                                 <td>&#8358;595,450.00</td>
                                 <td> <span className="badge rounded-pill alert-warning">Pending</span> </td>
                                 <td> 04-03-2022</td>
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

                             {/*row four */}
                             <tr>
                                 <td>7874</td>
                                 <td className="bold">Devo Lee</td>
                                 <td>devolee@domain.com</td>
                                 <td>&#8358;12,000.00</td>
                                 <td> <span className="badge rounded-pill alert-success">Delivered</span> </td>
                                 <td> 08-03-2022</td>
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

                             {/*row five */}
                             <tr>
                                 <td>8455</td>
                                 <td className="bold">Asake Music</td>
                                 <td>devon@example.com</td>
                                 <td>&#8358;79,000.00</td>
                                 <td> <span className="badge rounded-pill alert-danger">Cancelled</span> </td>
                                 <td> 10-03-2022</td>
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

                             {/*row six */}
                             <tr>
                                 <td>6763</td>
                                 <td className="bold">Burnaboy Odogwu</td>
                                 <td>burnaboy@odogwu.com</td>
                                 <td>&#8358;45,000.00</td>
                                 <td> <span className="badge rounded-pill alert-success">Delivered</span> </td>
                                 <td> 12-03-2022</td>
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

                             {/*row seven */}
                             <tr>
                                 <td>9823</td>
                                 <td className="bold">Khalid Olamide</td>
                                 <td>khalidmusics@westside.com</td>
                                 <td>&#8358;5,500.00</td>
                                 <td> <span className="badge rounded-pill alert-success">Delivered</span> </td>
                                 <td> 13-03-2022</td>
                                 <td className="text-end">
                                     <Link to="/dashboard/orders/7899" className="btn btn-light btn-analytics">Details </Link>
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
                     </Table></div>
                 </div>
             </Card>
         </section>
      </>
  )
}

export default DashboardPage
