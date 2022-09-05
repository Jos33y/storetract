import {Button, Col, Row, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import OrderSummary from "./orderSummary";
import React, {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {doc, getDoc, serverTimestamp, setDoc, addDoc, updateDoc, collection} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import Spinner from "../../components/Spinner";
import FlutterWaveLogo from "../../assets/images/flutter-wave.png";
import KlumpLogo from "../../assets/images/klump-two-ng.PNG";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const ShopPayment = ({businessUrl, storeData}) => {

    const params = useParams()
    const isMounted = useRef()

    const [displayP, setDisplayP] = useState(false);
    const [displayK, setDisplayK] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [formData, setFormData] = useState('')
    const [balanceData, setBalanceData] = useState('')
    const [shippingMethod, setShippingMethod] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [customerID, setCustomerID] = useState("")
    const [orderUniqueID, setOrderUniqueID] = useState("")
    const [carts, setCarts] = useState([])
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const [loading, setLoading] = useState(false);

    // save transactions for references
    const saveTransaction = async (response) => {
        let totalPrice= (Number(itemsPrice) + Number(shippingMethod.amount))
        try {
            const transactionData = {
                transactionId: response.transaction_id,
                customerId: (`${customerID}`),
                orderId: (`${orderUniqueID}`),
                paymentMethod: "FLUTTERWAVE",
                status: response.status,
                orderTotal: totalPrice,
                flutterWaveRef: response.flw_ref,
                transactionRef: response.tx_ref,
                timeStamp: serverTimestamp(),
            }
            const transRef = doc(db, 'shops',`${businessUrl}`, 'transactions', `${response.transaction_id}`)
            await setDoc(transRef, transactionData).then(() => {
                updateOrder()
            }).then(() => {
                addDepositToHistory(response)
            }).then(() => {
                updateWalletBalance()
            }).then(() => {
                let paymentMethod = JSON.stringify("FLUTTERWAVE");
                localStorage.setItem("paymentMethod" ,paymentMethod)
            })
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
                setBalanceData(balanceSnap.data())
            }
        }
        catch (e) {
            console.log({e})
        }
    }

    // update account balance
    const updateWalletBalance = async () => {
        let totalPrice= (Number(itemsPrice) + Number(shippingMethod.amount))
        const newBalance = (balanceData.accountBalance + totalPrice);
        try {
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
    const addDepositToHistory = async (response) => {
        let totalPrice= (Number(itemsPrice) + Number(shippingMethod.amount))
        try {
            const depositHistoryData = {
                amountDeposited: totalPrice,
                customerId: (`${customerID}`),
                orderId: (`${orderUniqueID}`),
                transactionRef: response.tx_ref,
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
        let totalPrice= (Number(itemsPrice) + Number(shippingMethod.amount))
        try {
            //store orders
            const orderCopy = {
                deliveryStatus: "Payment Successful",
                orderStatus:"Success",
                paymentMethod: "FlutterWave",
                orderTotal: totalPrice,
                orderSubTotal: itemsPrice,
                shippingPrice: shippingMethod.amount,
                timeStamp: serverTimestamp(),
            }
            const orderRef = doc(db, 'shops', `${businessUrl}`, 'orders', orderUniqueID)
            await updateDoc(orderRef, orderCopy)
        }

        catch (e) {
            console.log({e})
        }
    }

    const config = {
        public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_LIVE_KEY,
        tx_ref: Date.now(),
        amount: (Number(itemsPrice) + Number(shippingMethod ? shippingMethod.amount : '0')),
        currency: 'NGN',
        customer: {
            email: (formData.email),
            phone_number: (formData.phoneNumber),
            name: (formData.firstname + ' ' + formData.lastname),
        },
        customizations: {
            title: `${storeData.businessName}`,
            logo: 'https://i.ibb.co/KwGjsfj/logo192.png',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    const handlePaymentFlutter = async () => {
        setIsDisable(true)

        await handleFlutterPayment({
            callback: (response) => {
                saveTransaction(response).then(() => {
                    toast.success("Payment successful");
                }).then(() => {
                    window.location.href = '/checkout/order-confirmation';
                })
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {toast.error("Payment window closed");},
        });
        setIsDisable(false)
    }

    // check if paystack buttons is active
    const activePaystack = () => {
        if(displayP) {
            setDisplayP(false)
        }
        else {
            setDisplayP(true)
        }
    }

    // check if klump button is active
    const activeKlump = () => {
        if(displayK) {
            setDisplayK(false)
        }
        else {
            setDisplayK(true)
        }
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

    // useEffect functions containing add form data to session storage
    useEffect(() => {
        if(isMounted) {

            getWalletBalance().then()

            let localCustomerID = localStorage.getItem("customerID");
            let localCart = localStorage.getItem("cart");
            let localOrderID = localStorage.getItem("orderUniqueID");
            let localShipping = localStorage.getItem('shippingMethod');


            // customer ID session
            localCustomerID = JSON.parse(localCustomerID);
            //load persisted cart into state if it exists
            if (localCustomerID) {
                setCustomerID(localCustomerID)
                getCustomer(localCustomerID).then()
            }

            // orderID ID session
            localOrderID= JSON.parse(localOrderID);
            //load persisted cart into state if it exists
            if (localOrderID) {
                setOrderUniqueID(localOrderID)
            }
            // shipping session
            localShipping = JSON.parse(localShipping);
            //load persisted cart into state if it exists
            if (localShipping) {
                setShippingMethod(localShipping)

            }

            // cart session
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) {
                setCarts(localCart)
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
                        <div className="container-fluid">
                            <div className="Shop-section-wrapper">
                                <Row>
                                    {/*--------------payment section-----------------------*/}
                                    <Col lg={7}>
                                        <h5 className="title">Checkout </h5>
                                        {/*shipping address*/}
                                        <div className="Shipping-address">
                                            <Table className="table contact">
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
                                                    {shippingMethod ? (
                                                        <td colSpan={2}> <p> {shippingMethod.location} {` .  `} &#8358;{shippingMethod.amount.toString()
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </p></td>
                                                    ) : (
                                                        <td colSpan={2}> <p>FREE Delivery · Free </p></td>
                                                    )}


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


                                                    <td> <p className="left"> &#8358;{(shippingMethod ? shippingMethod.amount : 0).toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.00 </p> </td>
                                                </tr>
                                                <tr className="total">
                                                    <td colSpan={2}><p className="text-head"> Total</p></td>
                                                    <td> <p className="left">&#8358;{(shippingMethod ?  (Number(shippingMethod.amount) + Number(itemsPrice)) : (0)).toFixed(2).toString()
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
                                                        <div className="Payment-box" >
                                                            <h5 onClick={activePaystack}>
                                                                <span className="text">FlutterWave</span>
                                                                <img src={FlutterWaveLogo} alt="" className="img-pay"/>
                                                            </h5>
                                                            {displayP && (
                                                                <>
                                                                    <p>
                                                                        you've selected flutterwave, click make payment button to continue.
                                                                    </p>
                                                                    <p>
                                                                        You will be redirected to our secure payment checkout.
                                                                    </p>
                                                                    <div className="payment-btn">
                                                                        <Button className="btn btn-md btn-primary" onClick={handlePaymentFlutter}> Make Payment </Button>
                                                                    </div>
                                                                </> ) }
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        {/*paystack button*/}
                                                        <div className="Payment-box klump">
                                                            <h5 onClick={activeKlump}>
                                                                <span className="text">useKlump</span>
                                                                <img src={KlumpLogo} alt="" className="img-pay"/>
                                                            </h5>
                                                            {displayK && (
                                                                <>
                                                                    <p>
                                                                        you've selected useKlump, click make payment button to continue.
                                                                    </p>
                                                                    <p>
                                                                        Klump helps you buy anything you need on a payment plan that works for you. <br/>
                                                                        Spread payments over 3 months after an initial 25% deposit.
                                                                    </p>
                                                                    <div className="payment-btn">
                                                                        <Button disabled={isDisable} className="btn btn-md btn-primary"
                                                                                onClick={() => {toast.success("useKlump coming soon")}}> Make Payment </Button>
                                                                    </div>
                                                                </> ) }
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>

                                        </div>

                                        {/*buttons section*/}
                                        <div className="form-group buttons">
                                            <Row>
                                                <Col lg={6} className="col-md-4 col-6">
                                                    <p>
                                                        <Link to={(`/checkout/information`)} className="link"> Return to Shipping</Link>
                                                    </p>
                                                </Col>

                                            </Row>
                                        </div>
                                    </Col>

                                    {/*--------------order summary section-----------------------*/}
                                    <Col lg={5}>
                                        <OrderSummary shippingMethod={shippingMethod} confirm={false} />
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

export default ShopPayment