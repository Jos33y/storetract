import React from 'react';
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import SectionOne from "../assets/images/section-one.svg"
import SectionTwo from "../assets/images/section-two.svg"
import SectionThree from "../assets/images/section-three.svg"
import SectionFour from  "../assets/images/section-four.svg"
import {Fade, LightSpeed, Zoom, Slide} from '@stahl.luke/react-reveal';
import Shake from '@stahl.luke/react-reveal/Shake';

const BodySection = () => {

    return (
        <>
            <div className="Body-section">
                <Container>
                    <LightSpeed left>
                    <div className="Body-header">

                            <h3>With <span className="colored"> Storetract </span> you can set up your online store in a few clicks</h3>
                    </div>
                    </LightSpeed>
                   {/*Section One*/}
                    <div className="Section-one">
                        <Row>

                            <Col md={6}>
                                <Zoom right>
                                    <div className="Box-image">
                                        <img src={SectionOne} alt="" className="box-fluid"/>
                                    </div>
                                </Zoom>

                            </Col>

                            <Col md={6}>
                                <Fade left>
                                <div className="Body-text">
                                    <h4> Bring your <span className="colored"> business online</span></h4>
                                    <h6>
                                        Storetract allows you to create and mange your online
                                        store without technical skills.
                                    </h6>
                                </div>
                                </Fade>
                            </Col>
                        </Row>
                    </div>

                    {/*Section Two*/}
                    <div className="Section-one">
                        <Row>
                            <Col md={6}>
                                <Fade left>
                                <div className="Body-text">
                                    <h4> Bring your <span className="colored"> business with you</span></h4>
                                    <h6>
                                        Storetract provides you with tools that allows you  manage your online
                                        store  anywhere and on any device
                                    </h6>
                                </div>
                                </Fade>
                            </Col>

                            <Col md={6} className="order-first">
                                <Zoom right>
                                    <div className="Box-image">
                                        <img src={SectionTwo} alt="" className="box-fluid"/>
                                    </div>
                                </Zoom>

                            </Col>
                        </Row>
                    </div>


                    {/*Section Three*/}
                    <div className="Section-one">
                        <Row>
                            <Col md={6}>
                                <Zoom right>
                                    <div className="Box-image">
                                        <img src={SectionThree} alt="" className="box-fluid section-three"/>
                                    </div>
                                </Zoom>

                            </Col>

                            <Col md={6}>
                                <Fade left>
                                <div className="Body-text">
                                    <h4> Automate your <span className="colored"> sales</span></h4>
                                    <h6>
                                        Storetract helps keep your store running while you are away you can still make sales.
                                    </h6>
                                </div>
                                </Fade>
                            </Col>
                        </Row>
                    </div>

                </Container>

                <div className="Container-two">
                    <Container>
                        <Row>
                            <Col md={5}>
                                <div className="Body-text">
                                    <Shake>
                                        <h4> We are with you every step of the way</h4>
                                        <h6>
                                            At Storetract the success of your online store is our priority.
                                            we have a dedicated support that will be hands on with you from signup
                                        </h6>
                                    </Shake>


                                </div>
                            </Col>
                            <Col md={7} className="order-first">
                                <div className="Box-image">
                                    <img src={SectionFour} alt="" className="box-fluid"/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/*news letter section*/}
                <Container>
                    <div className="News-letter">
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <Slide top>
                                <Form className="Form-letter">
                                    <h4>Newsletter</h4>
                                    <p>stay up to date with our latest news and products</p>
                                    <Row>
                                        <Col md={9}>
                                            <input type="text" className="form-control" placeholder="Your email address"/>
                                        </Col>
                                        <Col md={3}>
                                            <Button className="btn btn-md btn-primary">
                                                Subscribe
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                </Slide>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    )

}
export default BodySection
