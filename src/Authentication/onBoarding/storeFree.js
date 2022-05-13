import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import ActivateStore from  "../../assets/images/online-shopping.jpg";
import {doc, getDoc, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
import {toast} from "react-toastify";

const StoreFreeActivation = ({fullName, userId}) => {

    const navigate = useNavigate()

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
        storeMotto: '',
        domainName: '',
        activationDate: '',
    })

    const {businessName, businessPhone, storeCategory, storeUrl} = formData

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            let shopUrl = `${formData.businessName
                .replace(/,?\s+/g, '-')
                .toLowerCase()}`

            const auth = userId;
            const formDataCopy = {...formData}
            formDataCopy.businessPhone = Number(formData.businessPhone);
            formDataCopy.storeUrl = shopUrl;
            formDataCopy.storePlan = 'BASIC';
            formDataCopy.storeOwnerRef = auth;
            formDataCopy.activationDate = serverTimestamp();

            // get store url
            const getStoreRef = doc(db, 'shops', shopUrl)
            const getStoreSnap =  await getDoc(getStoreRef)
            if(getStoreSnap.exists()) {
                toast.error("store url already existed")
            }
            else {
                await setDoc (doc(db, 'shops', shopUrl), formDataCopy)
                    .then(() => {
                        const userData = {
                            storeActivated: true,
                            businessName: formDataCopy.businessName,
                            storeUrl: formDataCopy.storeUrl,
                        }
                        const userRef = doc(db, 'users', auth)
                        updateDoc(userRef, userData).then(
                            () => {
                                newWallet(shopUrl).then()
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
        console.log("Activation in progress")
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

    return(
        <>
            <Container>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10} className="Auth-box">
                        <Row>
                           <Col md={6}>
                               <div className="Form-image">
                                   <img src={ActivateStore} alt="" className="img-fluid"/>
                                   <p> <Link className="register" to="/onboarding/pricing">change store plan</Link></p>
                               </div>
                           </Col>
                            <Col md={6}>
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
                                                   maxLength={100}
                                                   placeholder="Your Business Name"/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="Input-box">
                                            <label htmlFor="storeUrl"> <i className="fas fa-external-link-alt"></i> </label>
                                            <input type="url"
                                                   id="storeUrl"
                                                   onChange={onChange}
                                                   required={true}
                                                   maxLength={100}
                                                   value={storeUrl}
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
                                            <label htmlFor="businessCategory"><i className="fas fa-layer-group"></i></label>
                                            <input type="text"
                                                   id="businessCategory"
                                                   onChange={onChange}
                                                   required={true}
                                                   maxLength={20}
                                                   value={storeCategory}
                                                   placeholder="Your Business Category"/>
                                        </div>
                                    </div>

                                    <div className="form-group button">
                                        <Button disabled={false} className="btn btn-md btn-primary" type="submit">Activate</Button>
                                    </div>

                                </Form>
                            </Col>
                        </Row>

                    </Col>
                    <Col md={1}></Col>
                </Row>
            </Container>
        </>
    )
}

export default StoreFreeActivation