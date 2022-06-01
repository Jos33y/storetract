import React, {useEffect, useRef, useState} from "react";
import "../pagesStyles.css"
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import SettingsHeader from "./settingsHeader";
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";


const AccountSettings = ({storeUrl}) => {

    const isMounted = useRef()
    const [loading, setLoading] = useState(false);
    const [bankData, setBankData] = useState({
        bankName: '',
        accountNumber: '',
        accountName: '',
        updateTime: '',
    })

    const {bankName, accountNumber, accountName} = bankData;

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
