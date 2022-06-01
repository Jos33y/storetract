import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {doc, getDoc, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
import {toast} from "react-toastify";
import ActivateStore from "../../assets/images/online-shopping.jpg";
import Spinner from "../../Shop/components/Spinner";

const StorePaidActivation =  ({fullName, userId}) => {


    const isMounted = useRef()
    const navigate = useNavigate()
    const [details, setDetails] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(true)


    const [formData, setFormData] = useState({
        businessName: '',
        businessPhone: '',
        storeCategory: '',
        storePlan: '',
        storeUrl: '',
        storeOwnerRef: '',
        storeSocials: [],
        storeLogo: '',
        storeDescription: '',
        storeSetup: false,
        storeMotto: '',
        domainName: '',
        activationDate: '',
        startDate:'',
        graceDate: '',
        endDate: '',
    })

    const {businessName, businessPhone, storeCategory} = formData

    const onSubmit = async (e) => {
        setDisabled(true)
        let domainUrl =   details.nameDomain.split('.')
        e.preventDefault()

        let nowDate = new Date()
        let future = new Date();
        future.setDate(future.getDate() + 30);
        let grace = new Date();
        grace.setDate(grace.getDate() + 37);

        try {
            let Url = `${(domainUrl[0]).toLowerCase()}`
            const auth = userId;
            const formDataCopy = {...formData}
            formDataCopy.storeUrl = Url;
            formDataCopy.domainName = details.nameDomain;
            formDataCopy.storePlan = 'STANDARD';
            formDataCopy.storeOwnerRef = auth;
            formDataCopy.activationDate = serverTimestamp();
            formDataCopy.startDate = nowDate;
            formDataCopy.endDate = future;
            formDataCopy.graceDate = grace;

            // get store url
            const getStoreRef = doc(db, 'shops', Url)
            const getStoreSnap =  await getDoc(getStoreRef)
            if(getStoreSnap.exists()) {
                toast.error("store url already existed")
            }
            else {
                await setDoc (doc(db, 'shops', Url), formDataCopy)
                    .then(() => {
                        const userData = {
                            storeActivated: true,
                            storePlan: 'STANDARD',
                            businessName: formDataCopy.businessName,
                            storeUrl: (`${Url}`),
                        }
                        const userRef = doc(db, 'users', auth)
                        updateDoc(userRef, userData).then(
                            () => {
                                newWallet(Url).then()
                                updateDomain(Url).then()
                            }
                        )
                    })
                toast.success("store activated")
                navigate("/onboarding/store-activated")
            }

        }
        catch (error) {
            console.log({error})
            toast.error("unable to activate shop at the moment")
        }
        setDisabled(false)
    }

    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        } ))
    }

    // create new wallet
    const newWallet = async (storeUrl) => {
        try {
            const balanceDataCopy = {
                accountBalance: 0,
                timeStamp: serverTimestamp(),
            }
            const balanceRef = doc(db, 'shops', storeUrl, 'walletBalance', 'account')
            await setDoc(balanceRef, balanceDataCopy)
        }
        catch (error) {
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


    // useEffect functions containing add form data to session storage
    useEffect(() => {
        if(isMounted) {
            let paymentDetails = localStorage.getItem("PaymentDetails");

            // customer ID session
            paymentDetails = JSON.parse(paymentDetails);
            //load persisted cart into state if it exists
            if (paymentDetails) setDetails(paymentDetails)
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
                    <Container>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10} className="Auth-box">
                        <Row>
                            <Col lg={6}>
                                <div className="Form-image">
                                    <img src={ActivateStore} alt="" className="img-fluid"/>
                                    {/*<p> <Link className="register" to="/onboarding/pricing">change store plan</Link></p>*/}
                                </div>
                            </Col >
                            <Col lg={6}>
                                <Form className="Form" onSubmit={onSubmit} autoComplete="off">
                                    <h5>Activate Store</h5>

                                    <div className="form-group">
                                        <div className="Input-box">
                                            <label htmlFor="full-name"><i className="fas fa-user"></i></label>
                                            <input type="text"
                                                   id="name"
                                                   onChange={onChange}
                                                   required={true}
                                                   value={fullName}
                                                   maxLength={100}
                                                   readOnly={true}
                                                   placeholder="Your Full Name"/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="Input-box">
                                            <label htmlFor="businessName"><i className="fas fa-store"></i></label>
                                            <input type="text"
                                                   id="businessName"
                                                   onChange={onChange}
                                                   required={true}
                                                   value={businessName}
                                                   maxLength={50}
                                                   placeholder="Your Business Name"/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="Input-box">
                                            <label htmlFor="storeUrl"> <i className="fas fa-external-link-alt"></i> </label>
                                            <input type="text"
                                                   id="storeUrl"
                                                   onChange={onChange}
                                                   required={true}
                                                   maxLength={50}
                                                   value={details.nameDomain}
                                                   readOnly={true}
                                                   placeholder="Your Store URL"/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="Input-box">
                                            <label htmlFor="businessPhone"><i className="fas fa-mobile-alt"></i></label>
                                            <input type="text"
                                                   id="businessPhone"
                                                   onChange={onChange}
                                                   required={true}
                                                   maxLength={20}
                                                   value={businessPhone}
                                                   placeholder="Your Business Phone Number"/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="Input-box">
                                            <label htmlFor="storeCategory"><i className="fas fa-layer-group"></i></label>
                                            <select
                                                className="form-control"
                                                id="storeCategory"
                                                required={ true }
                                                onChange={ onChange }
                                                value={storeCategory}
                                            >
                                                <option selected={true}>--Select Category--</option>
                                                <option value='accessories'>Accessories</option>
                                                <option value='book-store'>Book Store</option>
                                                <option value='electronics-and-gadgets'>Electronics / Gadgets </option>
                                                <option value='fashion'>Fashion </option>
                                                <option value='food-and-beverages'>Food & Beverages</option>
                                                <option value='health-and-beauty'>Health & Beauty </option>
                                                <option value='home-and-garden'>Home & Garden</option>
                                                <option value='jewelry-and-watches'>Jewelry & Watches</option>
                                                <option value='toy-and-hobbies'>Toys & Hobbies</option>
                                                <option value='others'>Others Categories</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group button">
                                        <Button disabled={disabled} className="btn btn-md btn-primary" type="submit">Activate</Button>
                                    </div>

                                </Form>
                            </Col>
                        </Row>

                    </Col>
                    <Col md={1}></Col>
                </Row>
            </Container>
                )}
        </>
    )
}

export default StorePaidActivation