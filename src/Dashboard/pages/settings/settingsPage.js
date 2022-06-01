import React from "react";
import "../pagesStyles.css"
import {Card ,Col ,Row} from "react-bootstrap";
import SettingsHeader from "./settingsHeader";
import ProfileSettings from "./profileSettings";

const SettingsPage = ({userId, storeUrl}) => {
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Profile settings </h2>
                </div>

                <Card className="card">
                    <div className="card-body">
                        <Row className="gx-5">
                            <aside className="col-lg-3 border-end">
                                <SettingsHeader current={'profile'} />
                            </aside>

                            <Col lg={9}>
                                <section className="content-body p-xl-4">
                                    <ProfileSettings userId={userId} storeUrl={storeUrl} />

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
