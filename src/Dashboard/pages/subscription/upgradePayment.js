import {Card, Col, Row} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import Spinner from "../../../Shop/components/Spinner";
import {usePaystackPayment} from "react-paystack";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {doc, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";


const UpgradePayment = ({email, userId, storeUrl}) => {

    const isMounted = useRef()
    const navigate = useNavigate();
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [pricePay, setPricePay] = useState(0);

    // PayStack Payment config
    const paystack_config = {
        reference: (new Date()).getTime().toString(),
        email: (email),
        amount: (pricePay * 100),
        publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_LIVE_KEY,
    };


    const saveData = async () => {

        let nowDate = new Date()
        let future = new Date();
        future.setDate(future.getDate() + 30);
        let grace = new Date();
        grace.setDate(grace.getDate() + 37);
        try {
            const formDataCopy = {
                domainName: `${details.nameDomain}`,
                storePlan: 'STANDARD',
                startDate: nowDate,
                endDate: future,
                graceDate: grace,
            }
            await updateDoc(doc(db, 'shops', storeUrl), formDataCopy)
                .then(() => {
                    const userData = {
                        storeActivated: true,
                        storePlan: 'STANDARD',
                        paymentStatus: true,
                    }
                    const userRef = doc(db, 'users', userId)
                    updateDoc(userRef, userData).then(
                        () => {
                            updateDomain(storeUrl).then()
                        }
                    )
                })

        }catch (error) {
            console.log({error})
        }

    }

    // create new Domain
    const updateDomain = async (domainName) => {
        try {
            const domainData = {
                domainUrl: `https://${details.nameDomain}`,
                storeUrl: domainName,
                timeStamp: serverTimestamp(),
            }
            const domainRef = doc(db, 'domains', details.nameDomain)
            await setDoc(domainRef, domainData)
        }
        catch (error) {
            console.log({error})
        }
    }

    // onSuccess function to call when the PayStack payment is a success
    const onSuccess = (reference) => {

        // check status from paystack
        if (reference.status === "success") {

            saveData().then(() => {
                toast.success("payment successful")
                navigate("/dashboard/subscriptions/payment-successful")
            })
        }

    };

    // you onclose function for when the PayStack dialog is closed
    const onClose = () => {
        // implementation for  whatever you want to do when the PayStack dialog closed.
        toast.error("Payment window closed");
    }

// function that initializes PayStack Payment
    const initializePayment = usePaystackPayment(paystack_config);

    // save transactions for references

    const makePayment = async () => {
        initializePayment(onSuccess, onClose)
    }

    // useEffect functions containing add form data to session storage
    useEffect(() => {
        if(isMounted) {
            let paymentDetails = localStorage.getItem("PaymentDetails");

            // customer ID session
            paymentDetails = JSON.parse(paymentDetails);
            //load persisted cart into state if it exists
            if (paymentDetails) setDetails(paymentDetails)
            setPricePay((parseFloat('2500') + parseFloat(paymentDetails.domainPrice)))
            setLoading(false)
            return () => {
                isMounted.current = false
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return(
        <>
            {loading ?
                (<Spinner />)
                :
                (

                    <div className="store-payment">
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <Card className="card">
                                    <div className="card-body">
                                        <h5 className="title">Order Summary</h5>
                                        <hr/>
                                        <div className="order-summary">
                                            <div className="order-titles">
                                                <h6> Storetract Standard </h6>
                                                <h6>{details.nameDomain} </h6>
                                                <h6 className='total'>Total: </h6>

                                            </div>

                                            <div className="order-price">
                                                <h6> &#8358;2,500 </h6>
                                                <h6> &#8358;{details.domainPrice.toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h6>
                                                <h6 className="total">&#8358;{pricePay.toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h6>
                                            </div>
                                        </div>

                                        <div className="payment-button">
                                            <button onClick={makePayment} className="btn btn-md btn-success"> Pay Now</button>
                                        </div>
                                        {/*<div className="coupon">*/}
                                        {/*    <div className="form-group">*/}
                                        {/*        <input type="text" placeholder="Discount Code"/>*/}
                                        {/*        <button className="btn btn-md btn-primary" > Apply </button>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}



                                    </div>
                                </Card>

                            </Col>
                        </Row>
                    </div>
                )}
        </>
    )
}

export default UpgradePayment