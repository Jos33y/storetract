import {Card, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {addDoc, collection, doc, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../Shop/config/firebase.config";

const WithdrawalPage = ({userId, storeUrl, profileData, currentBalance, accountDetails}) => {

    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleWithdrawal = async (e) =>{
        e.preventDefault()
        setLoading(true);
        const uniqueCustomerId = (Math.floor(Math.random() * 100000000));
        const customerRef = (`${userId}-${uniqueCustomerId}`)

        let amountWithdraw = (Number(withdrawAmount) + Number(200));

        if (amountWithdraw > currentBalance.accountBalance) {
            toast.error("Insufficient Funds")
        }
        else if (amountWithdraw <= '1000') {
            toast.error("can't process withdrawal less than 1,000")
        }
        else {
            try {
                const url = 'https://sandboxapi.fincra.com/disbursements/payouts';
                const options = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'api-key': process.env.REACT_APP_FINCRA_SECRET_API_KEY
                    },
                    body: JSON.stringify({
                        sourceCurrency: 'NGN',
                        destinationCurrency: 'NGN',
                        beneficiary: {
                            country: 'NG',
                            firstName: profileData.name,
                            email: profileData.email,
                            type: 'individual',
                            accountHolderName: accountDetails.accountName,
                            accountNumber: accountDetails.accountNumber,
                            bankCode: accountDetails.bankCode
                        },
                        paymentDestination: 'bank_account',
                        amount: withdrawAmount,
                        business: process.env.REACT_APP_FINCRA_BUSINESS_ID,
                        description: 'Withdrawal request',
                        customerReference: customerRef
                    })
                };

               await fetch(url, options)
                    .then(res => res.json())
                    .then((json) => {
                        if(json) {
                            if(json.success){
                                saveTransaction(json).then(() => {
                                    toast.success("Withdrawal processed successfully")
                                    window.location.reload();
                                })
                            }
                            else {
                                toast.error("error in withdrawal try again or contact support!")
                            }
                        } else {
                            toast.error("Withdrawal Error! reload and try again.")
                        }

                    })
                    .catch(err => console.error('error:' + err));

            }
            catch (error) {
                console.log({error})
            }
        }
        setLoading(false)
    }

    // save transactions for references
    const saveTransaction = async (response) => {
        let amountWithdraw = (Number(withdrawAmount) + Number(200));

        try {
            const transactionData = {
                transactionId: response.data.id,
                transactionRef: response.data.reference,
                customerRef: response.data.customerReference,
                message: response.message,
                success: (response.success ? 'Successful' : 'Failed'),
                status: response.data.status,
                storeUrl: storeUrl,
                withdrawAmount: withdrawAmount,
                totalWithdraw: amountWithdraw,
                timeStamp: serverTimestamp(),
            }
            const transRef = doc(db,  'admin', 'transactions', 'withdrawal' , `${response.data.id}`)
            await setDoc(transRef, transactionData).then(() => {
                addWithdrawToHistory(response).then()
                updateWalletBalance().then()
            })
        }
        catch (error) {
            console.log({error})
        }
    }

    // update account balance
    const updateWalletBalance = async () => {
        let amountWithdraw = (Number(withdrawAmount) + Number(200));
        const newBalance = (Number(currentBalance.accountBalance) - Number(amountWithdraw));
        try {
            const balanceDataCopy = {
               accountBalance: newBalance,
                updateStamp: serverTimestamp(),
            }
            const balanceRef = doc(db, 'shops', `${storeUrl}`, 'walletBalance', 'account')
            await updateDoc(balanceRef, balanceDataCopy)
        }

        catch (e) {
            console.log({e})
        }
    }

    // add purchase to deposit history
    const addWithdrawToHistory = async (response) => {
        let amountWithdraw = (Number(withdrawAmount) + Number(200));
        try {
            const withdrawHistoryData = {
                withdrawalAmount: withdrawAmount,
                withdrawalCharges:'200',
                totalWithdraw: amountWithdraw,
                withdrawalId: response.data.id,
                status: (response.success ? 'Successful' : 'Failed'),
                transactionRef: response.data.reference,
                timeStamp: serverTimestamp(),
            }
            const withdrawRef = collection(db, 'shops', `${storeUrl}`, 'walletWithdrawalHistory')
            await addDoc(withdrawRef, withdrawHistoryData)
        }
        catch (error) {
            console.log({error})
        }
    }

    const onChange = (e) => {
        setWithdrawAmount(e.target.value)
    }

    return (
        <>
           <div className="withdrawal-page">
               <Row>
                   <Col lg={12} className="col-md-6">
                       <Card className="card account-details">
                           <div className="card-body">
                               <div className="account-details-title">
                                   <p>Account Name: </p>
                                   <p>Account No: </p>
                                   <p>Bank Name: </p>
                                   <Link to="/dashboard/settings/account" > Set account details</Link>
                               </div>
                               <div className="account-details-text">
                                   <p> {accountDetails ? accountDetails.accountName : ''}</p>
                                   <p>{accountDetails ? accountDetails.accountNumber : ''}</p>
                                   <p>{accountDetails ? accountDetails.bankName : ''}</p>
                               </div>
                           </div>
                       </Card>
                   </Col>
                   <Col lg={12} className="col-md-6">
                       <Card className="card withdrawal-form">
                           <div className="card-body">
                               <Form onSubmit={handleWithdrawal}>
                                   <h5>Withdraw</h5>
                                   <div className="form-group">
                                       <label htmlFor="amount"> Amount</label>
                                       <input type="number"
                                              id="amount"
                                              required={true}
                                              onChange={onChange}
                                              className="form-control"
                                              placeholder="1000"/>
                                   </div>

                                   <div className="form-group">
                                       <button disabled={loading} type="submit" className="btn btn-md btn-primary">
                                           {loading ? (<>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"></span>&nbsp; </> ) : ('')
                                           }
                                           withdraw</button>
                                   </div>
                               </Form>
                           </div>
                       </Card>
                   </Col>
               </Row>



           </div>
        </>
    )
}
export default WithdrawalPage