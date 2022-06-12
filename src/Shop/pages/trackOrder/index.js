import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
// import {useNavigate} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";

const TrackOrder = ({businessUrl}) => {

    // const navigate = useNavigate()
    const[disable, setDisable]= useState(false)
    const [formData, setFormData] = useState({
        email:'',
        orderId: '',
    })

    const {email, orderId} = formData

    const handleSubmit = async (e) => {
        setDisable(true)
        e.preventDefault()
        try {

            const docRef = doc(db, 'shop', `${businessUrl}`, 'orders', formData.orderId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {

            }
        }
        catch (error) {
            console.log({error})
        }
        setDisable(false)
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        } ))
    }

    return (
        <>
            <div className="Tracking-order">
            <div className="bread-crumb">
                <ul>
                    <li>Home</li>
                    |
                    <li>Tracking</li>
                </ul>
            </div>

            <Container>
                <Row>
                    <Col lg={9}>
                        <div className="Tracking-order-text">
                            <p>To track your order please enter your Order ID in the box below and press the "Track" button.
                                This was given to you on your receipt and in the confirmation email you should have received.</p>
                        <Form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="orderId" hidden={true}>order id</label>
                                <input type="text"
                                       id="orderId"
                                       value={orderId}
                                       required={true}
                                       onChange={onChange}
                                       className="form-control"
                                       placeholder="Order ID"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" hidden={true}>Billing Email Address</label>
                                <input type="email"
                                       id="email"
                                       value={email}
                                       required={true}
                                       onChange={onChange}
                                       className="form-control"
                                       placeholder="Billing Email Address"/>
                            </div>

                            <div className="form-group button">
                                <Button disabled={disable} className="btn btn-md btn-primary"
                                        type="submit">Track Order</Button>
                            </div>
                        </Form>
                        </div>
                    </Col>
                </Row>

            </Container>
            </div>
        </>
    )
}
export default TrackOrder