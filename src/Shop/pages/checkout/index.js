import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "../../css/shopHeader.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import OrderSummary from "./orderSummary";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";
import {doc, getDoc, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";
import Spinner from "../../../components/Spinner";



const ShopCheckout = ({businessUrl}) => {

    const params = useParams()
    const isMounted = useRef()
    const navigate = useNavigate()

    const [carts, setCarts] = useState([])
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const [loading, setLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [customerID, setCustomerID] = useState("")
    const [orderUniqueID, setOrderUniqueID] = useState("")
    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        country: '',
        state: '',
        city: '',
        deliveryAddress: '',
        phoneNumber: '',
        customerId: '',
        timeStamp: '',
    });

    const orderData = {
        orderId: '',
        email: '',
        firstname: '',
        lastname: '',
        customerId: '',
        orderStatus: '',
        deliveryStatus: '',
        paymentMethod: '',
        shippingMethod: '',
        orderTotal: '',
        productOrdered: [],
        timeStamp: '',
    }


    const {email, firstname, lastname, country, state, city, deliveryAddress, phoneNumber} = formData

    // handle form data store and update form information
    const handleInfo = async (e) => {
        e.preventDefault()

        const randId = uuidv4().slice(0,7)
        const uniqueOrderId = (Math.floor(Math.random() * 100000000));
        setLoading(true);
        setIsDisabled(true);

        try {
            if ((!customerID && !formData.customerId) || (customerID !== formData.customerId)  ) {
                // console.log("not available")
                let customer = (formData.firstname).replace(/[^a-zA-Z ]/g, "");
                let customerUnique = `${(customer).replace(/,?\s+/g, '-')}-${randId}`
                let customerId = customerUnique.toLowerCase()
                let orderID = uniqueOrderId.toString();

                //make cart a string and store in local space
                let stringEmail = JSON.stringify(customerId);
                localStorage.setItem("customerID" ,stringEmail)
                let stringOrder = JSON.stringify(orderID);
                localStorage.setItem("orderUniqueID" ,stringOrder)
                // toast.success("stringify")

                console.log("Handling Information")
                const formDataCopy = {...formData}
                formDataCopy.customerId = customerId;
                formDataCopy.timeStamp = serverTimestamp();

                const customerRef = doc(db, 'shops', params.shopName, 'customers', customerId)
                await setDoc(customerRef, formDataCopy)
                    .then(() => {

                        //store orders
                        const orderCopy = {...orderData}
                        orderCopy.orderId = orderID;
                        orderCopy.customerId = customerId;
                        orderCopy.email = formData.email;
                        orderCopy.firstname = formData.firstname;
                        orderCopy.lastname = formData.lastname;
                        orderCopy.orderTotal = itemsPrice;
                        orderCopy.shippingMethod = "DHL Free Delivery";
                        orderCopy.deliveryStatus = "Awaiting Payment";
                        orderCopy.orderStatus = "Pending";
                        orderCopy.productOrdered = [...carts];
                        orderCopy.timeStamp = serverTimestamp();
                        const orderRef = doc(db, 'shops', params.shopName, 'orders', orderID)
                        setDoc(orderRef, orderCopy)
                    })
                // console.log({...formDataCopy})
                toast.success("information saved")
                navigate(`/${params.shopName}/checkout/payment`)
            }
            else if(customerID === formData.customerId){

                const formDataCopy = {...formData}
                formDataCopy.timeStamp = serverTimestamp()

                const customerRef = doc(db, 'shops', params.shopName, 'customers', customerID)
                await updateDoc(customerRef, formDataCopy)
                    .then(() => {
                        //store orders
                        const orderCopy = {...orderData}
                        orderCopy.orderId = orderUniqueID;
                        orderCopy.customerId = customerID;
                        orderCopy.email = formData.email;
                        orderCopy.firstname = formData.firstname;
                        orderCopy.lastname = formData.lastname;
                        orderCopy.orderTotal = itemsPrice;
                        orderCopy.shippingMethod = "DHL Free Delivery";
                        orderCopy.deliveryStatus = "Awaiting Payment";
                        orderCopy.orderStatus = "Pending";
                        orderCopy.productOrdered = [...carts];
                        orderCopy.timeStamp = serverTimestamp();
                        const orderRef = doc(db, 'shops', params.shopName, 'orders', orderUniqueID)
                        updateDoc(orderRef, orderCopy)
                    })

                toast.success("information updated")
                navigate(`/${params.shopName}/checkout/payment`);
            }
        }
        catch (error) {
                console.log({error})
            }
        setLoading(false);
        setIsDisabled(false);
    }

    // get customer information using customer ID
    const getCustomer = async (CustomerID) =>{
        setLoading(true)
        try {
            const customerRef = doc(db, 'shops', params.shopName, 'customers', CustomerID)
            const customerSnap =  await getDoc(customerRef)

            if(customerSnap.exists()){
                // console.log(customerSnap.data())
                setFormData(customerSnap.data())
            }
        }
        catch (e) {
            console.log({e})
        }
        setLoading(false)
    }


    // onChange function to make input functional
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        } ))
    }

// useEffect functions containing add form data to session storage
    useEffect(() => {
        if(isMounted) {
            let localCustomerID = localStorage.getItem("customerID");
            let localCart = localStorage.getItem("cart");
            let localOrderID = localStorage.getItem("orderUniqueID");

            // customer ID session
            localCustomerID = JSON.parse(localCustomerID);
            //load persisted cart into state if it exists
            if (localCustomerID) {
                setCustomerID(localCustomerID)
                getCustomer(localCustomerID)
                console.log(localCustomerID)
            }

            // orderID ID session
            localOrderID= JSON.parse(localOrderID);
            //load persisted cart into state if it exists
            if (localOrderID) {
                setOrderUniqueID(localOrderID)
                console.log(localOrderID)
            }

            // cart session
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) {
                setCarts(localCart)
                // console.log(carts)
            }
            // console.log("formdata id: "  + formData.customerId);
            // console.log( customerID);
        }

            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.


        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.shopName])


    return(
        <>
            { loading ?
                (<Spinner/>) :

                (
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
                                                       onChange={ onChange }
                                                       value={ firstname }
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
                                                       onChange={ onChange }
                                                       value={ lastname }
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
                                                       onChange={ onChange }
                                                       value={ email }
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
                                                       onChange={ onChange }
                                                       value={ phoneNumber }
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
                                               onChange={ onChange }
                                               value={ deliveryAddress }
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
                                                       placeholder="Ikeja"
                                                       onChange={ onChange }
                                                       value={ city }
                                                />
                                            </Col>
                                            <Col md={ 4 }>
                                                <label htmlFor="state">State</label>
                                                <select name="state"
                                                        className="form-control"
                                                        id="state"
                                                        required={ true }
                                                        onChange={ onChange }
                                                        value={ state }
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
                                                        onChange={ onChange }
                                                        value={ country }
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
                                                        type="submit"
                                                        disabled={isDisabled}> Continue to Payment</Button>
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
                )
            }
        </>
    )

}

export default ShopCheckout