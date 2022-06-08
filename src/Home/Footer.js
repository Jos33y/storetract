import React from "react";
import {Col ,Container ,Row} from "react-bootstrap";
import StoreTractLogo from "../assets/images/logo-svg.svg";
import {Link} from "react-router-dom";
import {Fade} from "@stahl.luke/react-reveal";

const Footer = () => {

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'auto'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };
  return(
      <>
          <div className="Footer-section">
              <Container>
                  <Fade bottom>
                  <Row className="justify-content-between">
                      <Col md={2}>
                          <img src={StoreTractLogo} alt="" className="logo-fluid"/>
                          <p>Packnow Technology ltd. &copy; 2022</p>
                      </Col>

                      <Col md={2}>
                          <ul>
                              <li><Link to="/" className="Footer-link"> Home </Link></li>
                              <li><Link to="/register" className="Footer-link"> Contact Us </Link></li>
                              <li><Link to="/register" className="Footer-link"> Sign Up </Link></li>
                          </ul>
                      </Col>
                      <Col md={3}>
                          <div className="footer-socials">
                              <ul>
                                  <li><a target="_blank" rel="noopener noreferrer" href="https://facebook.com/storetract" className="Footer-link"> <i className="fab fa-facebook"></i> </a></li>
                                  <li><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/storetract" className="Footer-link"> <i className="fab fa-twitter"></i> </a></li>
                                  <li><a target="_blank" rel="noopener noreferrer" href="https://instagram.com/storetract" className="Footer-link"> <i className="fab fa-instagram"></i> </a></li>
                                  <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/storetract/" className="Footer-link"> <i
                                      className="fab fa-linkedin-in"></i> </a></li>
                              </ul>
                          </div>
                      </Col>

                      <Col md={2}>
                          <ul>
                              <li> <Link to="/" className="Footer-link">Terms of use </Link> </li>
                              <li> <Link to="/" className="Footer-link"> Privacy Policy </Link></li>
                              <li>  </li>
                          </ul>

                      </Col>
                      <Col md={3}>
                          <h6 className="back-to-top" onClick={scrollToTop}>Back to top <i className="fas fa-chevron-up"></i> </h6>
                      </Col>
                  </Row>
                  </Fade>
              </Container>

          </div>
      </>
  )
}

export default Footer
