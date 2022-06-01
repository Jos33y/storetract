import {Card, Col, Row} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import Spinner from "../../Shop/components/Spinner";
import {usePaystackPayment} from "react-paystack";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../Shop/config/firebase.config";


const StorePayment = ({email, userId}) => {

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
        publicKey: "pk_test_92373800d132af22fc873ce48794f7f6165d4ad3",
    };

    const updatePaymentStatus =  async() => {
        try {
            const updateData = {
                paymentStatus: true,
            }
            const updateRef = doc(db, 'users', userId)
            await updateDoc(updateRef, updateData)
        }
        catch (error) {
            console.log({error})
        }
    }

    // onSuccess function to call when the PayStack payment is a success
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        //make payment method a string and store in local space

        // check status from paystack
        if (reference.status === "success") {
            updatePaymentStatus().then()
            toast.success("Payment successful");
            console.log({reference});
            navigate(`/onboarding/activate-standard-store`)
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

export default StorePayment