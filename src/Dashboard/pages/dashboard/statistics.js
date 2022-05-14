import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
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

const Statistics = () => {

    return (
        <>
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
        </>
    )

}

export default Statistics