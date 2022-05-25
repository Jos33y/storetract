import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import OrderSummary from "./orderSummary";
import React, {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {usePaystackPayment} from "react-paystack";
import {doc, getDoc, serverTimestamp, setDoc, addDoc, updateDoc, collection} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import Spinner from "../../components/Spinner";
import PaystackLogo from "../../assets/images/paystack-logo-vector.png";
import KlumpLogo from "../../assets/images/klump-two-ng.PNG";
import AcceptedPayment from "../../assets/images/shopimages/cards-501x173.png";

const ShopPayment = ({businessUrl}) => {

    const params = useParams()
    const navigate = useNavigate()
    const isMounted = useRef()

    const [displayP, setDisplayP] = useState(false);
    const [displayK, setDisplayK] = useState(false);
    const [payMethod, setPayMethod] = useState("not selected");
    const [formData, setFormData] = useState('')
    const [balanceData, setBalanceData] = useState('')

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [customerID, setCustomerID] = useState("")
    const [orderUniqueID, setOrderUniqueID] = useState("")
    const [carts, setCarts] = useState([])
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const [loading, setLoading] = useState(false);

    // save transactions for references
    const saveTransaction = async (reference) => {
        try {
            const transactionData = {
                transactionId: reference.reference,
                customerId: (`${customerID}`),
                orderId: (`${orderUniqueID}`),
                paymentMethod: "PAYSTACK",
                status: reference.status,
                message: reference.message,
                orderTotal: (`${itemsPrice}`),
                transactionRef: reference.transaction,
                timeStamp: serverTimestamp(),
            }
            const transRef = doc(db, 'shops',`${businessUrl}`, 'transactions', reference.reference)
            await setDoc(transRef, transactionData)
        }
        catch (error) {
            console.log({error})
        }
    }

    // get account balance
    const getWalletBalance = async () => {
        try {
            const getBalanceRef = doc(db, 'shops', `${businessUrl}`, 'walletBalance', 'account')
            const balanceSnap =  await getDoc(getBalanceRef)

            if(balanceSnap.exists()){
                // console.log(customerSnap.data())
                setBalanceData(balanceSnap.data())
            }
        }
        catch (e) {
            console.log({e})
        }
    }

    // update account balance
    const updateWalletBalance = async () => {
        const newBalance = (balanceData.accountBalance + itemsPrice);
        try {
            console.log("updating to Balance")
            const balanceDataCopy = {...balanceData}
            balanceDataCopy.accountBalance = newBalance;
            balanceDataCopy.timeStamp = serverTimestamp();

            const balanceRef = doc(db, 'shops', `${businessUrl}`, 'walletBalance', 'account')
            await updateDoc(balanceRef, balanceDataCopy)
        }

        catch (e) {
            console.log({e})
        }
    }

    // add purchase to deposit history
    const addDepositToHistory = async (reference) => {
        try {
            const depositHistoryData = {
                amountDeposited: (`${itemsPrice}`),
                customerId: (`${customerID}`),
                orderId: (`${orderUniqueID}`),
                transactionRef: reference.reference,
                timeStamp: serverTimestamp(),
            }
            const depositRef = collection(db, 'shops', `${businessUrl}`, 'walletDepositHistory')
            await addDoc(depositRef, depositHistoryData)
        }
        catch (error) {
            console.log({error})
        }
    }

    // update order status
    const updateOrder = async () => {
        try {
            //store orders
            const orderCopy = {
                deliveryStatus: "Confirmed",
                orderStatus:"Success",
                paymentMethod: "PayStack",
                orderTotal: (`${itemsPrice}`),
                timeStamp: serverTimestamp(),
            }
            const orderRef = doc(db, 'shops', `${businessUrl}`, 'orders', orderUniqueID)
            await updateDoc(orderRef, orderCopy)
        }

        catch (e) {
            console.log({e})
        }
    }

    // PayStack Payment config
    const paystack_config = {
        reference: (new Date()).getTime().toString(),
        email: (formData.email),
        amount: (itemsPrice * 100),
        publicKey: "pk_test_92373800d132af22fc873ce48794f7f6165d4ad3",
    };

    // function that initializes PayStack Payment
    const initializePayment = usePaystackPayment(paystack_config);

    // onSuccess function to call when the PayStack payment is a success
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        //make payment method a string and store in local space
        let paymentMethod = JSON.stringify("PAYSTACK");
        localStorage.setItem("paymentMethod" ,paymentMethod)

        saveTransaction(reference).then()
        // check status from paystack
        if (reference.status === "success") {
            updateWalletBalance().then()
            addDepositToHistory(reference).then()
            updateOrder().then()
        }
        // toast.success("stringify")
        toast.success("Payment successful");
        console.log({reference});
        navigate(`/checkout/order-confirmation`)

    };

    // you onclose function for when the PayStack dialog is closed
    const onClose = () => {
        // implementation for  whatever you want to do when the PayStack dialog closed.
        toast.error("Payment window closed");
    }

    // check if paystack buttons is active
    const activePaystack = () => {
        if(displayP) {
            if(!displayK){
                setDisplayK(true)
                setPayMethod("useKlump")
            }
            setDisplayP(false)
        }
        else {
            if(displayK){
                setDisplayK(false)
            }
            setDisplayP(true)
            setPayMethod("payStack")
        }
    }

    // check if klump button is active
    const activeKlump = () => {

        if(displayK) {
            if(!displayP){
                setDisplayP(true)
                setPayMethod("payStack")
            }
            setDisplayK(false)
        }
        else {
            if(displayP){
                setDisplayP(false)
            }
            setDisplayK(true)
            setPayMethod("useKlump")
        }
    }

        // make payment functions for any selected payment method
    const makePayment = () => {
        if(payMethod === 'not selected') {
            toast.error("Select a payment method");
        }
        else if(payMethod === "useKlump") {
            toast.success("useKlump coming soon");
        }
        else if(payMethod === "payStack") {
            initializePayment(onSuccess, onClose)
        }
        else {
            toast.error("Select a payment method");
        }

    }

    // get customer information using customer ID
    const getCustomer = async (CustomerID) =>{
        setLoading(true)
        try {
            const customerRef = doc(db, 'shops', `${businessUrl}`, 'customers', CustomerID)
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

    // useEffect functions containing add form data to session storage
    useEffect(() => {
        if(isMounted) {

            getWalletBalance()

            let localCustomerID = localStorage.getItem("customerID");
            let localCart = localStorage.getItem("cart");
            let localOrderID = localStorage.getItem("orderUniqueID");
            // console.log(publicKeyCode);

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
                // console.log(carts)
            }
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.checkoutUrl])

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
                                <Link  to={(`/cart`)} className="bread-crumb-link"> Cart</Link>
                            </li>
                            <i className="fas fa-chevron-right"></i>
                            <li>
                                <Link  to={(`/checkout/information`)} className="bread-crumb-link"> Information</Link>
                            </li>
                            <i className="fas fa-chevron-right"></i>
                            <li>
                                <span className='active'> Payment</span>
                            </li>
                            <i className="fas fa-chevron-right" ></i>
                            <li>
                                <span className='link'> Order Confirmation</span>
                            </li>

                        </ul>
                    </div>

                    {/*--------------main section-----------------------*/}
                    <div className="Shop-section-wrapper">
                        <Row>
                            {/*--------------payment section-----------------------*/}
                            <Col md={7}>
                                <h5 className="title">Checkout </h5>
                                    {/*shipping address*/}
                                    <div className="Shipping-address">
                                        <Table className="table">
                                            <tbody>
                                            <tr className="top">
                                                <td><p className="text-head"> Contact</p></td>
                                                <td> <p>{formData.email} </p></td>
                                                <td>
                                                    <Link to={(`/checkout/information`)} className="link">Change</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><p className="text-head"> Ship to</p></td>
                                                <td> <p>{formData.deliveryAddress}, {formData.city}, {formData.state} state, {formData.country} </p></td>
                                                <td>
                                                    <Link to={(`/checkout/information`)} className="link">Change</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><p className="text-head"> Method</p></td>
                                                <td colSpan={2}> <p>FREE DHL Express Recorded delivery + taxes paid · Free </p></td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>

                                    <div className="Shipping-address Sub-total">
                                        <Table className="table">
                                            <tbody>
                                            <tr className="top">
                                                <td colSpan={2}><p className="text-head"> Sub total</p></td>
                                                <td> <p className="left"> &#8358;{(itemsPrice).toFixed(2).toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p> </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}><p className="text-head"> Shipping</p></td>
                                                <td> <p className="left">Free</p> </td>
                                            </tr>
                                            <tr className="total">
                                                <td colSpan={2}><p className="text-head"> Total</p></td>
                                                <td> <p className="left">&#8358;{(itemsPrice).toFixed(2).toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p> </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>

                                    {/*shipping method*/}
                                    <div className="Payment-method">
                                        <h6 className="sub-title">Payment Method</h6>
                                        <h6 className="note">Choose your preferred payment method.</h6>

                                        <div className="Payment-method-list">
                                            <Row>
                                                <Col md={6}>
                                                    {/*paystack button*/}
                                                    <div className="Payment-box" onClick={activePaystack}>
                                                        <h5>
                                                            <span className="text">PayStack</span>
                                                            <img src={PaystackLogo} alt="" className="img-pay"/>
                                                        </h5>
                                                        {displayP && (
                                                            <>
                                                                <p>
                                                                    You will be redirected to our secure payment checkout.
                                                                </p>
                                                                <div className="payment-img">
                                                                    <img src={AcceptedPayment} alt="" className="img-fluid"/>
                                                                </div>
                                                            </> ) }
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    {/*paystack button*/}
                                                    <div className="Payment-box klump" onClick={activeKlump}>
                                                        <h5>
                                                            <span className="text">useKlump</span>
                                                            <img src={KlumpLogo} alt="" className="img-pay"/>
                                                        </h5>
                                                        {displayK && (
                                                            <>
                                                                <p>
                                                                    Klump helps you buy anything you need on a payment plan that works for you. <br/>
                                                                    Spread payments over 3 months after an initial 25% deposit.
                                                                </p>
                                                            </> ) }
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                    </div>

                                    {/*buttons section*/}
                                    <div className="form-group buttons">
                                        <Row>
                                            <Col md={ 4 }>
                                                <Button className="btn btn-md btn-primary" onClick={makePayment}> Make Payment </Button>
                                            </Col>
                                            <Col md={4}>
                                                <p>
                                                    <Link to={(`/checkout/information`)} className="link"> Return to Shipping</Link>
                                                </p>
                                            </Col>

                                        </Row>
                                    </div>
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

export default ShopPayment