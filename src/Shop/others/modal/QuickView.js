import React ,{useState} from "react";
import {Row, Col ,Container} from "react-bootstrap";

const QuickView = ({product}) => {

   const [display, setDisplay] = useState(false);

    return(
        <>
          <Container className="Quick-view">
              <Row>
                  <Col md={6}>
                      <div className="Image-box">
                          <Row>
                              <Col md={9} className="main">
                                  <img src={product.imgUrls[0]} alt="" className="img-fluid"/>
                              </Col>
                              <Col md={3} className="thumb">
                                  <ul className="Thumb-nails">
                                      <li>  <img src={product.imgUrls[0] ? product.imgUrls[0] : product.imgUrls[0] } alt="" className="img-fluid"/></li>
                                      <li>  <img src={product.imgUrls[1] ? product.imgUrls[1] : product.imgUrls[0] } alt="" className="img-fluid"/></li>
                                      <li>  <img src={product.imgUrls[2] ? product.imgUrls[2] : product.imgUrls[0] } alt="" className="img-fluid"/></li>
                                  </ul>
                              </Col>
                          </Row>

                      </div>

                  </Col>

                  <Col md={6}>
                      <div className="Quick-view-text">
                          <h5>{product.productName} </h5>
                          <h6> &#8358;{product.productPrice.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              {product.offer &&
                              (<span className="discount-price">  &#8358; {product.productDiscountPrice.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>)}
                          </h6>
                          <p>
                              {product.productDescription}
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


