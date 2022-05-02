import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "../../css/shopHeader.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import React from "react";
import OrderSummary from "./orderSummary";
import {toast} from "react-toastify";



const ShopCheckout = ({businessUrl}) => {

    const params = useParams()
    const navigate = useNavigate()

    const handleInfo = () => {
        console.log("hello world")
        toast.success("information saved")
        navigate(`/${params.shopName}/checkout/payment`)
    }

    return(
        <>
            <Container>
                <div className="Shop-Checkout">
                    {/*--------------bread crumbs section-----------------------*/}
                    <div className='bread-crumb'>
                        <ul>
                            <li>
                                <Link  to={(`/${businessUrl}/cart`)} className="bread-crumb-link"> Cart</Link>
                            </li>
                            <i className="fas fa-chevron-right"></i>
                            <li>
                                <span className='active'> Information</span>
                            </li>
                            <i className="fas fa-chevron-right"></i>
                            <li>
                                <span className='link'> Payment</span>
                            </li>
                            <i className="fas fa-chevron-right"></i>
                            <li>
                                <span className='link'> Order Confirmation</span>
                            </li>

                        </ul>
                    </div>

                    {/*--------------main section-----------------------*/}

                    <div className="Shop-section-wrapper">
                        <Row>
                            {/*--------------information section-----------------------*/}
                            <Col md={7}>
                                <h5 className="title">Checkout</h5>
                                <Form onSubmit={ handleInfo } className="Form-checkout">
                                    {/*-------------- personal information section-----------------------*/}
                                    <h6 className="sub-title">Personal Information</h6>

                                    <div className="form-group">
                                        <Row>
                                            <Col md={ 6 }>
                                                <label htmlFor="firstname">First Name</label>
                                                <input type="text"
                                                       id="firstname"
                                                       required={ true }
                                                       className="form-control"
                                                       maxLength={ 100 }
                                                       placeholder="Jane or John"
                                                       />
                                            </Col>
                                            <Col md={ 6 }>
                                                <label htmlFor="lastname">Last Name</label>
                                                <input type="text"
                                                       id="lastname"
                                                       required={ true }
                                                       className="form-control"
                                                       maxLength={ 100 }
                                                       placeholder="Doe"
                                                      />
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="form-group">
                                        <Row>
                                            <Col md={ 6 }>
                                                <label htmlFor="email">Email</label>
                                                <input type="email"
                                                       id="email"
                                                       required={ true }
                                                       className="form-control"
                                                       maxLength={ 100 }
                                                       placeholder="something@email.com"
                                                       />
                                            </Col>
                                            <Col md={ 6 }>
                                                <label htmlFor="lastname">Phone Number</label>
                                                <input type="phone"
                                                       id="phoneNumber"
                                                       className="form-control"
                                                       required={ true }
                                                       maxLength={ 20 }
                                                       placeholder="080-234-0000"
                                                       />
                                            </Col>
                                        </Row>
                                    </div>


                                    {/*-------------- shipping information section-----------------------*/}
                                    <h6 className="sub-title">Shipping Information</h6>

                                    <div className="form-group">
                                        <label htmlFor="deliveryAddress">Delivery Address</label>
                                        <input type="text"
                                               id="deliveryAddress"
                                               className="form-control"
                                               required={ true }
                                               placeholder="Street Address"
                                               />
                                    </div>

                                    <div className="form-group">
                                        <Row>
                                            <Col md={ 4 }>
                                                <label htmlFor="city">City</label>
                                                <input type="text"
                                                       id="city"
                                                       className="form-control"
                                                       maxLength={ 100 }
                                                       required={ true }
                                                       placeholder="Ikeja"/>
                                            </Col>
                                            <Col md={ 4 }>
                                                <label htmlFor="state">State</label>
                                                <select name="state"
                                                        className="form-control"
                                                        id="state"
                                                        required={ true }
                                                        >
                                                    <option disabled selected>--Select State--</option>
                                                    <option value="Abia">Abia</option>
                                                    <option value="Adamawa">Adamawa</option>
                                                    <option value="Akwa Ibom">Akwa Ibom</option>
                                                    <option value="Anambra">Anambra</option>
                                                    <option value="Bauchi">Bauchi</option>
                                                    <option value="Bayelsa">Bayelsa</option>
                                                    <option value="Benue">Benue</option>
                                                    <option value="Borno">Borno</option>
                                                    <option value="Cross Rive">Cross River</option>
                                                    <option value="Delta">Delta</option>
                                                    <option value="Ebonyi">Ebonyi</option>
                                                    <option value="Edo">Edo</option>
                                                    <option value="Ekiti">Ekiti</option>
                                                    <option value="Enugu">Enugu</option>
                                                    <option value="FCT">Federal Capital Territory</option>
                                                    <option value="Gombe">Gombe</option>
                                                    <option value="Imo">Imo</option>
                                                    <option value="Jigawa">Jigawa</option>
                                                    <option value="Kaduna">Kaduna</option>
                                                    <option value="Kano">Kano</option>
                                                    <option value="Katsina">Katsina</option>
                                                    <option value="Kebbi">Kebbi</option>
                                                    <option value="Kogi">Kogi</option>
                                                    <option value="Kwara">Kwara</option>
                                                    <option value="Lagos">Lagos</option>
                                                    <option value="Nasarawa">Nasarawa</option>
                                                    <option value="Niger">Niger</option>
                                                    <option value="Ogun">Ogun</option>
                                                    <option value="Ondo">Ondo</option>
                                                    <option value="Osun">Osun</option>
                                                    <option value="Oyo">Oyo</option>
                                                    <option value="Plateau">Plateau</option>
                                                    <option value="Rivers">Rivers</option>
                                                    <option value="Sokoto">Sokoto</option>
                                                    <option value="Taraba">Taraba</option>
                                                    <option value="Yobe">Yobe</option>
                                                    <option value="Zamfara">Zamfara</option>
                                                </select>
                                            </Col>

                                            <Col md={ 4 }>
                                                <label htmlFor="country">Country</label>
                                                <select name="country"
                                                        className="form-control"
                                                        id="country"
                                                        required={ true }
                                                >
                                                    <option disabled selected>--Select Country--</option>
                                                    <option value='NIG'>Nigeria</option>
                                                    <option value='GHN'>Ghana</option>
                                                </select>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="form-group buttons">
                                        <Row>
                                            <Col md={ 4 }>
                                                <Button className="btn btn-md btn-primary"
                                                        type="submit"> Continue to Payment</Button>
                                            </Col>
                                            <Col md={ 4 }>
                                                <p><Link to={ (`/${ businessUrl }/cart`) }
                                                         className="link"> Return to Cart</Link></p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </Col>

                            {/*--------------order summary section-----------------------*/}
                            <Col md={5}>
                                <OrderSummary confirm={false} />
                            </Col>
                        </Row>
                    </div>
                </div>

            </Container>
        </>
    )

}

export default ShopCheckout