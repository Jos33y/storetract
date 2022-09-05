import {Card, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {addDoc, collection, doc, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../Shop/config/firebase.config";

const WithdrawalPage = ({storeUrl, profileData, currentBalance, accountDetails}) => {

    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [totalWithdrawal, setTotalWithdrawal] = useState(null);
    const [responseId, setResponseId] = useState('')
    const [loading, setLoading] = useState(false);
    const [fetchFee, setFetchFee] = useState(false);
    const [flutterFee, setFlutterFee] = useState(null);

    const handleFetchFee = async (e) =>{
        e.preventDefault()
        setLoading(true);

        try {
            const url = '/fetch_fee';
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: withdrawAmount,
                })
            };

            await fetch(url, options)
                .then(res => res.json())
                .then((json) => {
                    if(json) {
                        if(json.status === 'success'){
                            let feePrice = (Number(json.data[0].fee) + Number(100));
                            let totalAmount = (Number(feePrice) + Number(withdrawAmount));
                           setFlutterFee(feePrice);
                           setTotalWithdrawal(totalAmount);

                           setFetchFee(true);
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
        catch (e) {

        }
        setLoading(false)
    }
    const handleWithdrawal = async (e) =>{
        e.preventDefault()
        setLoading(true);
        const uniqueCustomerId = (Math.floor(Math.random() * 100000));

        let amountWithdraw = totalWithdrawal;

        if (amountWithdraw > currentBalance.accountBalance) {
            toast.error("Insufficient Funds")
        }
        else if (amountWithdraw <= '100') {
            toast.error("can't process withdrawal less than 1,000")
        }
        else {
            try {
                const url = '/withdraw';
                const options = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: withdrawAmount,
                        bankCode: accountDetails.bankCode,
                        accountNumber: accountDetails.accountNumber,
                        businessName: profileData.businessName,
                        customerRef: uniqueCustomerId,

                    })
                };

               await fetch(url, options)
                    .then(res => res.json())
                    .then((json) => {
                        if(json) {
                            if (json.status === 'success') {
                                try{
                                    console.log(responseId);
                                    const url = '/verify_transaction';
                                    const options = {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                                        body: JSON.stringify({ transactionRef: json.data.id})
                                    };

                                    fetch(url, options)
                                        .then(res => res.json())
                                        .then(json => {
                                            console.log(json)
                                            if(json.status === 'success') {
                                                saveTransaction(json).then(() => {
                                                    toast.success("Withdrawal Queued Successfully")
                                                }).then(() => {
                                                    window.location.reload();
                                                })
                                            }
                                            else {
                                                toast.error("error in withdrawal try again or contact support!")
                                            }
                                        })
                                }
                                catch (e) { console.log({e})}

                            }
                        }else {
                            toast.error("Withdrawal Error! reload and try again.")
                        }})
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
        const uniqueCustomerId = (Math.floor(Math.random() * 100000));
        let responseID = "trx" + uniqueCustomerId + response.data.id;
        setResponseId(responseID);
        try {
            const transactionData = {
                transactionId: response.data.id,
                transactionRef: response.data.reference,
                message: response.data.complete_message,
                status: response.data.status,
                storeUrl: storeUrl,
                narration: response.data.narration,
                fullName: response.data.full_name,
                withdrawAmount: response.data.amount,
                fee: response.data.fee,
                flutterTime: response.data.created_at,
                totalWithdraw: totalWithdrawal,
                timeStamp: serverTimestamp(),
            }
            const transRef = doc(db,  'admin', 'transactions', 'withdrawal' , `${responseID}`)
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
        const newBalance = (Number(currentBalance.accountBalance) - Number(totalWithdrawal));
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
        try {
            const withdrawHistoryData = {
                withdrawalAmount: withdrawAmount,
                withdrawalCharges: flutterFee,
                totalWithdraw: totalWithdrawal,
                withdrawalId: response.data.id,
                status: response.data.status === 'FAILED' ? 'PENDING' : response.data.status,
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

        if(e.target.value) {
            setFetchFee(false)
        }
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
                                   <Link to="/dashboard/settings/account" className="link"> Set account details</Link>
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
                               <Form onSubmit={handleFetchFee}>
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

                                   {fetchFee ?
                                       (<>
                                           <div className="form-group calculated">
                                               <label htmlFor="amount"> Processing Fee: </label>
                                               <p className="processing">{flutterFee}</p>
                                           </div>
                                           <div className="form-group calculated">
                                               <label htmlFor="amount"> Total: </label>
                                               <p className="total">{(totalWithdrawal).toString()
                                                   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                           </div>
                                       </>)
                                       :
                                       ('')
                                   }

                                   <div className="form-group">
                                       {fetchFee ?
                                           (<button disabled={loading} onClick={handleWithdrawal} className="btn btn-md btn-success">
                                               {loading ? (<>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"></span>&nbsp; </>) : ('')
                                               }
                                               confirm withdrawal</button>)
                                           :
                                           (<button disabled={loading} type="submit" className="btn btn-md btn-primary">
                                               {loading ? (<>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"></span>&nbsp; </>) : ('')
                                               }
                                               withdraw</button>)
                                       }
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