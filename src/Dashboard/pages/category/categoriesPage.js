import React from "react";
import "../pagesStyles.css";
import {Card ,Col ,Row} from "react-bootstrap";
import ViewCategories from "./viewCategories";
import AddCategory from "./addCategory";

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
                                <AddCategory />
                            </Col>
                            <Col md={8}>
                                <ViewCategories />
                            </Col>
                        </Row>
                    </div>
                </Card>

            </section>

            </>
    )

}

export default CategoriesPage
