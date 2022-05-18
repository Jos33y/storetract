import React from "react";
import "../pagesStyles.css"
import {Button ,Card ,Col ,Form ,Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import AvatarDefault from "../../../assets/images/avatardefault_92824.png";

const SettingsPage = () => {
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Profile setting </h2>
                </div>

                <Card className="card">
                    <div className="card-body">
                        <Row className="gx-5">
                            <aside className="col-lg-3 border-end">
                                <nav className="nav nav-pills flex-lg-column mb-4">
                                    <Link  to="/dashboard/settings" aria-current="page" className="nav-link active"> General</Link>
                                    <Link  to="/dashboard/settings" className="nav-link"> Business Settings</Link>
                                    <Link  to="/dashboard/settings" className="nav-link"> Social Accounts</Link>
                                </nav>
                            </aside>

                            <Col lg={9}>
                                <section className="content-body p-xl-4">
                                    <Form>
                                        <Row>
                                            <Col lg={8}>
                                                <Row className="gx-3">
                                                    <div className="col-6 mb-3">
                                                        <label htmlFor="firstname" className="form-label">First Name </label>
                                                        <input type="text" placeholder="Type here..." className="form-control"/>
                                                    </div>

                                                    <div className="col-6 mb-3">
                                                        <label htmlFor="lastname" className="form-label">Last Name </label>
                                                        <input type="text" placeholder="Type here..." className="form-control"/>
                                                    </div>

                                                    <div className="col-6 mb-3">
                                                        <label htmlFor="businessname" className="form-label">Business Name </label>
                                                        <input type="text" placeholder="Type here..." className="form-control"/>
                                                    </div>

                                                    <div className="col-6 mb-3">
                                                        <label htmlFor="storename" className="form-label">Store Url </label>
                                                        <input type="text" placeholder="Type here..." className="form-control"/>
                                                    </div>

                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="email" className="form-label">Email </label>
                                                        <input type="email" placeholder="Type here..." className="form-control"/>
                                                    </div>

                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="phone" className="form-label">Phone </label>
                                                        <input type="tel" placeholder="Type here..." className="form-control"/>
                                                    </div>

                                                    <div className="col-lg-12 mb-3">
                                                        <label htmlFor="address" className="form-label">Address </label>
                                                        <input type="text" placeholder="Type here..." className="form-control"/>
                                                    </div>

                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="birthday" className="form-label">Birthday </label>
                                                        <input type="date" className="form-control"/>
                                                    </div>
                                                </Row>
                                            </Col>
                                            <aside className="col-lg-4">
                                                <figure className="text-lg-center">
                                                    <img src={AvatarDefault} alt="user avatar" className="img-lg mb-3 img-avatar"/>
                                                    <figcaption>
                                                        <button type="button" className="btn btn-outline-primary">
                                                            <i className="fas fa-upload"></i> upload
                                                        </button>
                                                    </figcaption>
                                                </figure>
                                            </aside>
                                        </Row>
                                        <br/>
                                        <Button  className="btn btn-primary" type="submit"> Save changes</Button>
                                    </Form>

                                    <hr className="my-5"/>
                                    <Row style={{maxWidth: '920px'}}>
                                        <div className="col-md">
                                            <article className="box mb-3 bg-light">
                                                <button type="button" className="btn float-end btn-outline-secondary btn-sm">Change</button>
                                                <h6>Password</h6>
                                                <small className="text-muted d-block" style={{width: '70%'}}>You can reset or change your password by clicking here</small>
                                            </article>
                                        </div>

                                        <div className="col-md">
                                            <article className="box mb-3 bg-light">
                                                <button type="button" className="btn float-end btn-outline-danger btn-sm">Deactivate</button>
                                                <h6>Remove account</h6>
                                                <small className="text-muted d-block" style={{width: '70%'}}>Once you delete your account, there is no going back.</small>
                                            </article>
                                        </div>
                                    </Row>
                                </section>

                            </Col>
                        </Row>
                    </div>
                </Card>
            </section>
        </>
    )

}
export default SettingsPage
