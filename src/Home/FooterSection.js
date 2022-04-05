import React from "react";
import {Col ,Container ,Row} from "react-bootstrap";
import StoreTractLogo from "../assets/images/logo-svg.svg";
import {Link} from "react-router-dom";
import {Fade} from "react-reveal";

const FooterSection = () => {
  return(
      <>
          <div className="Footer-section">
              <Container>
                  <Fade bottom>
                  <Row className="justify-content-between">
                      <Col md={2}>
                          <img src={StoreTractLogo} alt="" className="logo-fluid"/>
                          <p>Packnow Tech. &copy; 2022</p>
                      </Col>

                      <Col md={2}>
                          <ul>
                              <li><Link to="https://" className="Footer-link"> Home </Link></li>
                              <li><Link to="https://" className="Footer-link"> Contact Us </Link></li>
                              <li><Link to="https://" className="Footer-link"> Pricing </Link></li>
                          </ul>
                      </Col>

                      <Col md={3}>
                          <div className="footer-socials">
                              <ul>
                                  <li><Link to="https://" className="Footer-link"> <i className="fab fa-facebook"></i> </Link></li>
                                  <li><Link to="https://" className="Footer-link"> <i className="fab fa-twitter"></i> </Link></li>
                                  <li><Link to="https://" className="Footer-link"> <i className="fab fa-instagram"></i> </Link></li>
                                  <li><Link to="https://" className="Footer-link"> <i
                                      className="fab fa-linkedin-in"></i> </Link></li>
                              </ul>
                          </div>
                      </Col>

                      <Col md={2}>
                          <ul>
                              <li> <Link to="https://" className="Footer-link">Terms of use </Link> </li>
                              <li> <Link to="https://" className="Footer-link"> Privacy Policy </Link></li>
                              <li>  </li>
                          </ul>

                      </Col>
                      <Col md={3}>
                          <h6 className="back-to-top">Back to top <i className="fas fa-chevron-up"></i> </h6>
                      </Col>
                  </Row>
                  </Fade>
              </Container>

          </div>
      </>
  )
}

export default FooterSection
