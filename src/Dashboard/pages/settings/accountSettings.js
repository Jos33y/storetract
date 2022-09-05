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
    const [bankList, setBankList] = useState([])
    const [isDisable, setIsDisable] = useState(true);
    const [account, setAccount] = useState(false)
    const [bankData, setBankData] = useState({
        bankName: '',
        bankCode: '',
        accountNumber: '',
        accountName: '',
        updateTime: '',
    })

    const {bankCode, accountNumber, accountName} = bankData;

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
//handling account resolve soon
    const getAccount = async() => {
        try {
            const getAccountRef = doc(db, 'shops', storeUrl, 'walletBalance', 'accountInfo')
            const getAccountSnap =  await getDoc(getAccountRef)
            if(getAccountSnap.exists()) {

                setBankData(getAccountSnap.data())
                setAccount(true)
            }
        }
        catch (error) {
            console.log({error})
        }
    }

    const getBanksList = async () => {
        setLoading(true)
        try {
            const url = '/getBanks';
            const options = {
                method: 'GET',
                headers: {Accept: 'application/json'}
            };

            await  fetch(url, options)
                .then(res => res.json())
                .then(json => {setBankList(json.data)})
                .catch(err => console.error('error:' + err));
        }
        catch (error) {
            console.log({error})
        }
        setLoading(false)
    }

    const confirmAccount = async () => {
        setLoading(true)
        try {
            const url = '/resolve';
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ accountNumber: accountNumber, bankCode: bankCode })
            };

            await fetch(url, options)
                .then(res => res.json())
                .then(json => {

                    if(json.status === 'error') {
                        toast.error("Try again. Unable to get bank details")
                        setAccount(false)
                    }
                    else{
                        setBankData((prevState) => ({
                            ...prevState,
                            accountName: json.data.account_name,
                            bankCode: bankCode,
                            accountNumber: json.data.account_number,
                        }))
                        setAccount(true);
                    }

                })
        } catch (error) {
            console.log({error})
        }
        setLoading(false)
    }

    const onChange = (e) => {
        setAccount(false)
        if(e.target.id === 'accountNumber'){
            let lengths = e.target.value;
            if(lengths.length === 10){
                setIsDisable(false)
            }
            else {
                setIsDisable(true)
            }
        }
        setBankData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
        if(e.target.id === 'bankCode') {
            let cartData = [...bankList]
            const existingItem = cartData.find(cartItem => cartItem.code === e.target.value);

            setBankData((prevState) => ({
                ...prevState,
                bankName: existingItem.name,
            }))
        }

        }

    useEffect(() => {
        if(isMounted) {
            getAccount().then()
            getBanksList().then()
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
                                            <select name="bankCode"
                                                    id="bankCode"
                                                    value={bankCode}
                                                    onChange={onChange}
                                                    className="form-control">
                                                {bankList.map((bank) => (
                                                    <option key={bank.id}
                                                            value={bank.code}>{bank.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="firstname" className="form-label">Account Number: </label>
                                            <input type="text"
                                                   id="accountNumber"
                                                   placeholder="0000000000"
                                                   required={true}
                                                   value={accountNumber}
                                                   maxLength={10}
                                                   onChange={onChange}
                                                   className="form-control"/>
                                        </div>

                                        {account && (
                                            <div className="form-group">
                                                <label htmlFor="accountName" className="form-label">Account Name: </label>
                                                <input type="text"
                                                       id="accountName"
                                                       placeholder="Your Account Name"
                                                       required={true}
                                                       value={accountName}
                                                       onChange={onChange}
                                                       readOnly={true}
                                                       className="form-control"/>
                                            </div>
                                        )}

                                        <br/>
                                        <div className="button-save">
                                            {account ? (
                                                    <Button  className="btn btn-primary" type="submit">
                                                        {loading ? (<>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"></span>&nbsp; </> ) : ('')
                                                        }
                                                        Save Account</Button>
                                                )
                                                : (
                                                    <Button disabled={isDisable} className="btn btn-primary" onClick={confirmAccount} type="button">
                                                        {loading ? (<>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"></span>&nbsp; </> ) : ('')
                                                        }
                                                        Confirm Account
                                                    </Button>
                                                )}
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
