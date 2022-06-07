import {Card, Col, Row} from "react-bootstrap";
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
import {Link} from "react-router-dom";

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
            data: [],
            // data: [18, 17, 4, 3, 2, 20, 25, 31, 25, 22,],
            backgroundColor: 'rgb(44, 120, 220)',
        },
        {
            label: 'Visitors',
            data: [],
            // data: [40, 20, 17, 9, 23, 35, 39, 30, 34, 25,],
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
                        <article className="card-body store-settings">
                            <h4 className="card-title">Things to do.</h4>
                            <h6>1. Set up store look <Link to="/dashboard/settings/store"> here </Link> </h6>
                            <h6>2. Create product categories <Link to="/dashboard/categories"> here </Link>  </h6>
                            <h6>3. Add different products <Link to="/dashboard/add-product"> here </Link>  </h6>
                            <h6>4. Add delivery locations fees <Link to="/dashboard/delivery-list"> here </Link> </h6>
                            <h6>5. Profile Settings <Link to="/dashboard/settings/profile"> here </Link> </h6>
                        </article>
                    </Card>
                </Col>
            </Row>
        </>
    )

}

export default Statistics