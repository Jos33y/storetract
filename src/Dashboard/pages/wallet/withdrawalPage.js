import {Card, Col, Form, Row} from "react-bootstrap";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

const WithdrawalPage = ({storeUrl, userId}) => {

    const isMounted = useRef()
    const [accountDetails, setAccountDetails] = useState(null)

    const getAccountDetails = async () => {
        try {
            const currentRef = doc(db, 'shops', storeUrl, 'walletBalance', 'accountInfo')
            const currentSnap = await getDoc(currentRef)

            if(currentSnap.exists()) {
                setAccountDetails(currentSnap.data())
            }

        }catch (error) {
            console.log({error})
        }
    }

    const handleWithdrawal = async (e) =>{
        e.preventDefault()
        console.log('handling Withdrawal')

    }

    useEffect(() => {
        if(isMounted) {
            getAccountDetails().then()
        }
        return () => {
            isMounted.current = false;
        }
// eslint-disable-next-line
    },[isMounted, userId])
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
                                       <input type="number" className="form-control" placeholder="1000"/>
                                   </div>

                                   <div className="form-group">
                                       <button type="submit" className="btn btn-md btn-primary"> withdraw</button>
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