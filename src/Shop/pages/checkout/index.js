import {Button, Col, Form, Row} from "react-bootstrap";
import "../../css/shopHeader.css"
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import OrderSummary from "./orderSummary";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";
import {collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import Spinner from "../../components/Spinner";



const ShopCheckout = ({businessUrl}) => {

    // const params = useParams()
    const isMounted = useRef()
    const navigate = useNavigate()

    const [carts, setCarts] = useState([])
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const [loading, setLoading] = useState(false)
    const[location, setLocations]= useState([])
    const [isDisabled, setIsDisabled] = useState(false)
    const [customerID, setCustomerID] = useState("")
    const [shippingMethod, setShippingMethod] = useState("");
    const [orderUniqueID, setOrderUniqueID] = useState("")
    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        country: 'Nigeria',
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
        setLoading(true);
        setIsDisabled(true);
        e.preventDefault()
        const randId = uuidv4().slice(0,7)
        const uniqueOrderId = (Math.floor(Math.random() * 100000000));


        try {
            if ((!customerID && !formData.customerId) || (customerID !== formData.customerId)  ) {
                let customer = (formData.firstname).replace(/[^a-zA-Z ]/g, "");
                let customerUnique = `${(customer).replace(/,?\s+/g, '-')}-${randId}`
                let customerId = customerUnique.toLowerCase()
                let orderID = uniqueOrderId.toString();

                //make cart a string and store in local space
                let stringEmail = JSON.stringify(customerId);
                localStorage.setItem("customerID" ,stringEmail)
                let stringOrder = JSON.stringify(orderID);
                localStorage.setItem("orderUniqueID" ,stringOrder)
                let shippingTest =  await getShippingDetails(shippingMethod).then()
                let stringShipping = JSON.stringify({...shippingTest});
                localStorage.setItem("shippingMethod" ,stringShipping)

                const formDataCopy = {...formData}
                formDataCopy.customerId = customerId;
                formDataCopy.timeStamp = serverTimestamp();

                const customerRef = doc(db, 'shops', `${businessUrl}`, 'customers', customerId)
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
                        orderCopy.shippingMethod = shippingMethod;
                        orderCopy.deliveryStatus = "Awaiting Payment";
                        orderCopy.orderStatus = "Pending";
                        orderCopy.productOrdered = [...carts];
                        orderCopy.timeStamp = serverTimestamp();
                        const orderRef = doc(db, 'shops', `${businessUrl}`, 'orders', orderID)
                        setDoc(orderRef, orderCopy)
                    })

                toast.success("information saved")
                navigate(`/checkout/payment`);
            }
            else if(customerID === formData.customerId){

              let shippingTest =  await getShippingDetails(shippingMethod).then()
                let stringShipping = JSON.stringify({...shippingTest});
                localStorage.setItem("shippingMethod" ,stringShipping)

                const formDataCopy = {...formData}
                formDataCopy.timeStamp = serverTimestamp()

                const customerRef = doc(db, 'shops', `${businessUrl}`, 'customers', customerID)
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
                        orderCopy.shippingMethod = shippingMethod;
                        orderCopy.deliveryStatus = "Awaiting Payment";
                        orderCopy.orderStatus = "Pending";
                        orderCopy.productOrdered = [...carts];
                        orderCopy.timeStamp = serverTimestamp();
                        const orderRef = doc(db, 'shops',`${businessUrl}`, 'orders', orderUniqueID)
                        updateDoc(orderRef, orderCopy)
                    })
                toast.success("information updated")
                navigate(`/checkout/payment`);
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
            const customerRef = doc(db, 'shops', `${businessUrl}`, 'customers', CustomerID)
            const customerSnap =  await getDoc(customerRef)

            if(customerSnap.exists()){
                setFormData(customerSnap.data())
            }
        }
        catch (e) {
            console.log({e})
        }
        setLoading(false)
    }

    const getShippingDetails = async (shippingID) => {
        try {
            const shippingRef = doc(db, 'shops', `${businessUrl}`, 'deliveryInfo', shippingID)
            const shippingSnap =  await getDoc(shippingRef)

            if(shippingSnap.exists()){
                return shippingSnap.data();
            }
        }catch (error) {
            console.log({error})
        }
    }

    // onChange function to make input functional
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        } ))
    }

    const onLocationChange = (e) => {
        setShippingMethod(e.target.value);
    }

    const fetchLocation = async () => {
        try
        {
            const catRef = collection(db, 'shops', `${businessUrl}`, 'deliveryInfo' )
            const q = query(catRef, orderBy('timeStamp', 'asc'))
            const querySnap = await getDocs(q)
            let location = [];
            querySnap.forEach((doc) => {
                return location.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setLocations(location)
        }
        catch (error) {
            toast.error("could not fetch categories")
            console.log({error})
        }
        setLoading(false)
    }


// useEffect functions containing add form data to session storage
    useEffect(() => {
        if(isMounted) {
            let localCustomerID = localStorage.getItem("customerID");
            let localCart = localStorage.getItem("cart");
            let localOrderID = localStorage.getItem("orderUniqueID");
            let localShipping = localStorage.getItem('shippingMethod');
            fetchLocation().then()

            // customer ID session
            localCustomerID = JSON.parse(localCustomerID);
            //load persisted cart into state if it exists
            if (localCustomerID) {
                setCustomerID(localCustomerID)
                getCustomer(localCustomerID)
            }

            // orderID ID session
            localOrderID= JSON.parse(localOrderID);
            //load persisted cart into state if it exists
            if (localOrderID) {
                setOrderUniqueID(localOrderID)

            }

            // cart session
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) {
                setCarts(localCart)
            }
            // shipping session
            localShipping = JSON.parse(localShipping);
            //load persisted cart into state if it exists
            if (localShipping) {
                setShippingMethod(localShipping.deliveryUrl)
            }
        }

        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, businessUrl])

    return(
        <>
            { loading ?
                (<Spinner/>) :
                (
                    <div className="Shop-Checkout">
                    {/*--------------bread crumbs section-----------------------*/}
                        <div className='bread-crumb'>
                            <ul>
                                <li>
                                    <Link  to={(`/cart`)} className="bread-crumb-link"> Cart</Link>
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
                    <div className="container-fluid">
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
                                                <Col lg={ 6 }>
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
                                                <Col lg={ 6 }>
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
                                                <Col lg={ 6 }>
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
                                                <Col lg={ 6 }>
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
                                                <Col lg={ 4 }>
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
                                                <Col lg={ 4 }>
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

                                                <Col lg={ 4 }>
                                                    <label htmlFor="country">Country</label>
                                                    <select name="country"
                                                            className="form-control"
                                                            id="country"
                                                            required={ true }
                                                            onChange={ onChange }
                                                            value={ country }
                                                    >
                                                        <option disabled selected>--Select Country--</option>
                                                        <option value='Nigeria'>Nigeria</option>
                                                        <option value='Ghana'>Ghana</option>
                                                    </select>
                                                </Col>
                                            </Row>
                                        </div>

                                        {/*-------------- delivery information section-----------------------*/}
                                        <h6 className="sub-title">Delivery Method</h6>
                                        <div className="form-group">
                                            <Row>
                                                <Col lg={ 6 }>
                                                    <label htmlFor="country">Select Delivery</label>
                                                    <select name="location"
                                                            className="form-control"
                                                            id="location"
                                                            required={true}
                                                            onChange={ onLocationChange }
                                                            value={ shippingMethod }
                                                    >
                                                        <option value="0" selected>--Select Delivery--</option>
                                                        { location.map((locate) => (
                                                            <option key={locate.id}  value={locate.data.deliveryUrl}>
                                                                {`${locate.data.location} (${locate.data.amount})`}
                                                            </option>
                                                        )) }

                                                    </select>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="form-group buttons">
                                            <Row>
                                                <Col lg={ 4 } className="col-md-8 col-7">
                                                    <Button className="btn btn-md btn-primary"
                                                            type="submit"
                                                            disabled={isDisabled}> Continue to Payment</Button>
                                                </Col>
                                                <Col lg={ 4 } className="col-md-4 col-5">
                                                    <p><Link to={ (`/cart`) }
                                                             className="link"> Return to Cart</Link></p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>
                                </Col>

                                {/*--------------order summary section-----------------------*/}
                                <Col md={5}>
                                    <OrderSummary  confirm={false} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    </div>
                )
            }
        </>
    )

}

export default ShopCheckout