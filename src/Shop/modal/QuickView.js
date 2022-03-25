import React ,{useState} from "react";
import {Row, Col ,Container} from "react-bootstrap";
import ShirtImage from "../../assets/images/stripe-shirt.jpg"

const QuickView = () => {

   const [display, setDisplay] = useState(false);

    return(
        <>
          <Container className="Quick-view">
              <Row>
                  <Col md={6}>
                      <div className="Image-box">
                          <Row>
                              <Col md={9} className="main">
                                  <img src={ShirtImage} alt="" className="img-fluid"/>
                              </Col>
                              <Col md={3} className="thumb">
                                  <ul className="Thumb-nails">
                                      <li>  <img src={ShirtImage} alt="" className="img-fluid"/></li>
                                      <li>  <img src={ShirtImage} alt="" className="img-fluid"/></li>
                                      <li>  <img src={ShirtImage} alt="" className="img-fluid"/></li>
                                  </ul>
                              </Col>
                          </Row>

                      </div>

                  </Col>

                  <Col md={6}>
                      <div className="Quick-view-text">
                          <h5>UNCONDITIONAL Black cashmere mix mink collared single breasted coat </h5>
                          <h6> &#8358; 3000 <span className="discount-price"> &#8358; 6000</span></h6>
                          <p>
                              UNCONDITIONAL single breasted boyfriend coat in wool-cashmere coating ,
                              with mink collar . Fully lined in grosgrain lining, the mink collar has a
                              small white stripe on the centre back neck. Back neck and pocket flaps are faced in
                              lambskin.
                              <br/>
                              Colour : Black with Black Mink
                              <br/>
                              Product code : WCOT609MI
                              <br/>
                              Care instructions : Dry Clean only.
                          </p>
                          <button className="btn btn-md btn-primary btn-contact" onClick={() => {
                              setDisplay((prevState) => !prevState)
                          }}> Contact Seller</button>

                          {display ? (
                          <div className="contact-buttons">
                              <ul>
                                  <li>
                                      <a href="https://" className="btn btn-md btn-whatsapp"> WhatsApp <i className="fab fa-whatsapp"></i> </a>
                                  </li>

                                  <li>
                                      <a href="https://" className="btn btn-md btn-instagram"> Instagram <i className="fab fa-instagram"></i> </a>
                                  </li>

                                  <li>
                                      <a href="https://" className="btn btn-md btn-twitter"> Twitter <i className="fab fa-twitter"></i> </a>
                                  </li>

                                  <li>
                                      <a href="https://" className="btn btn-md btn-facebook"> Facebook <i className="fab fa-facebook"></i> </a>
                                  </li>
                              </ul>
                          </div>
                          ) : (<p className="margin-break"></p> )}


                      </div>
                  </Col>
              </Row>
          </Container>

        </>
    )

}

export default QuickView


