import React, {useEffect, useRef, useState} from "react";
import "../pagesStyles.css"
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import SettingsHeader from "./settingsHeader";
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
// const Flutterwave = require('flutterwave-node-v3');

const AccountSettings = ({storeUrl}) => {

    const isMounted = useRef()
    const [loading, setLoading] = useState(false);
    const [bankData, setBankData] = useState({
        bankName: '',
        accountNumber: '',
        accountName: '',
        updateTime: '',
    })

    // const flw = new Flutterwave(process.env.REACT_APP_FLUTTERWAVE_PUBLIC_TEST_KEY, process.env.REACT_APP_FLUTTERWAVE_SECRET_TEST_KEY);

    const {bankName, accountNumber, accountName} = bankData;

    // const getBanks = async () => {
    //
    //     try {
    //                 const payload = {
    //                     "country":"NG"
    //                 }
    //                 const response = await flw.Bank.country(payload)
    //                 console.log(response);
    //             } catch (error) {
    //                 console.log(error)
    //             }
    // }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {

            const bankDataCopy = {...bankData}
            bankDataCopy.updateTime = serverTimestamp()
            const bankDataRef = doc(db, 'shops', storeUrl, 'walletBalance', 'accountInfo')
            await setDoc(bankDataRef, bankDataCopy)
            toast.success("Account saved")
        }
        catch (error) {
            console.log({error})
        }
        setLoading(false)
    }

    const getAccount = async() => {
        try {
            const getAccountRef = doc(db, 'shops', storeUrl, 'walletBalance', 'accountInfo')
            const getAccountSnap =  await getDoc(getAccountRef)
            if(getAccountSnap.exists()) {

                setBankData(getAccountSnap.data())
            }
        }
        catch (error) {
            console.log({error})
        }
    }
    const onChange = (e) => {
        setBankData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    useEffect(() => {
        if(isMounted) {
            getAccount().then()
            // getBanks().then()
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Bank Details </h2>
                </div>

                <Card className="card">
                    <div className="card-body">
                        <Row className="gx-5">
                            <aside className="col-lg-3 border-end">
                                <SettingsHeader current={'account'} />
                            </aside>

                            <Col lg={8}>
                                <section className="content-body p-xl-4">
                                    <Form className="account-form" onSubmit={handleSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="bank-name" className="form-label">Bank Name: </label>
                                            <select name="bankName"
                                                    id="bankName"
                                                    value={bankName}
                                                    onChange={onChange}
                                                    className="form-control">
                                                <option value="null" selected={true} >Select bank name </option>
                                                <option value="Access Bank">Access Bank</option>
                                                <option value="Citibank">Citibank</option>
                                                <option value="Diamond Bank">Diamond Bank</option>
                                                <option value="Dynamic Standard Bank">Dynamic Standard Bank</option>
                                                <option value="Ecobank Nigeria">Ecobank Nigeria</option>
                                                <option value="Fidelity Bank Nigeria">Fidelity Bank Nigeria</option>
                                                <option value="First Bank of Nigeria">First Bank of Nigeria</option>
                                                <option value="First City Monument Bank">First City Monument Ban</option>
                                                <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
                                                <option value="Heritage Bank Plc">Heritage Bank Plc</option>
                                                <option value="Jaiz Bank">Jaiz Bank</option>
                                                <option value="Keystone Bank Limited">Keystone Bank Limited</option>
                                                <option value="Providus Bank Plc">Providus Bank Plc</option>
                                                <option value="Polaris Bank">Polaris Bank</option>
                                                <option value="Stanbic IBTC Bank Nigeria Limited">Stanbic IBTC Bank Nigeria Limited</option>
                                                <option value="Standard Chartered Bank">Standard Chartered Bank</option>
                                                <option value="Sterling Bank">Sterling Bank</option>
                                                <option value="Suntrust Bank Nigeria Limited">Suntrust Bank Nigeria Limited</option>
                                                <option value="Union Bank of Nigeria">Union Bank of Nigeria</option>
                                                <option value="United Bank for Africa">United Bank for Africa</option>
                                                <option value="Unity Bank Plc">Unity Bank Plc</option>
                                                <option value="Wema Bank">Wema Bank</option>
                                                <option value="Zenith Bank">Zenith Bank</option>
                                                <option value="KUDA" >Kuda MFB</option>
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="firstname" className="form-label">Account Number: </label>
                                            <input type="text"
                                                   id="accountNumber"
                                                   placeholder="0000000000"
                                                   required={true}
                                                   value={accountNumber}
                                                   onChange={onChange}
                                                   className="form-control"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="firstname" className="form-label">Account Name: </label>
                                            <input type="text"
                                                   id="accountName"
                                                   placeholder="Your Account Name"
                                                   required={true}
                                                   value={accountName}
                                                   onChange={onChange}
                                                   className="form-control"/>
                                        </div>
                                        <br/>
                                        <div className="button-save">
                                            <Button  className="btn btn-primary" type="submit">
                                                {loading ? (<>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                      aria-hidden="true"></span>&nbsp; </> ) : ('')
                                                }
                                                Save Account</Button>
                                        </div>

                                    </Form>
                                </section>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </section>
        </>
    )

}
export default AccountSettings
