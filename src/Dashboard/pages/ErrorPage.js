import React from "react";
import "./pagesStyles.css"
import {Button ,Col ,Row} from "react-bootstrap";
import ImageError from "../../assets/images/404-error.svg";

const ErrorPage = () => {

    return (
        <>
            <section className="content-error">
                <div className="error-page">
                    <Row>
                        <Col md={6}>
                            <div className="error-text">
                                <h2>Ooops! <br/>
                                    404.
                                </h2>
                                <p>This page cannot be found</p>
                                <Button classsName="btn btn-md btn-primary"> Go Home</Button>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="error-image">
                                <img src={ImageError} className="error-img" alt="404-error"/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )

}

export default ErrorPage
