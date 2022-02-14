import AdminNavbar from "../components/AdminNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import {useState} from "react";
import {toast} from "react-toastify";
import {getAuth} from "firebase/auth";
import {updateDoc ,doc, setDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import Plan from "./plan";

const ActivateShop = () => {

    const [formData, setFormData] = useState({
        businessName: '',
        businessPhone: '',
        businessCategory: '',
        businessPlan: '',
        shopUrl: '',
        shopOwnerRef: '',
    })
    const navigate = useNavigate()

    const {businessName, businessPhone, businessCategory, businessPlan} = formData

    const onSubmit = async (e) =>{
        e.preventDefault()
        try
        {
            //console.log({...formData})
            //generate unique URL for shop
            let shopUrl = `${formData.businessName
                .replace(/,?\s+/g, '-')
                .toLowerCase()}`

            const auth = getAuth()
            const formDataCopy = {...formData}
            formDataCopy.businessPhone = Number(formData.businessPhone)
            formDataCopy.shopUrl = shopUrl
            formDataCopy.shopOwnerRef = auth.currentUser.uid

            await setDoc (doc(db, 'shops', shopUrl), formDataCopy)
                .then( () => {
                        const userRef = doc(db, 'users', auth.currentUser.uid)
                         updateDoc(userRef, {
                            shopActivated: true,
                             businessName: formDataCopy.businessName,
                             phoneNumber: formDataCopy.businessPhone,
                             shopUrl: formDataCopy.shopUrl,
                        })
                })
            toast.success("shop activated")
            navigate("/admin-profile")

        }
        catch (error) {
            console.log({error})
            toast.error("unable to activate shop at the moment")
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        } ))
    }
    return (
        <>
            <AdminNavbar />
            <Container className="Profile">
                <h5>Activate Shop</h5>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Form className="Profile-form" onSubmit={onSubmit}>
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <input type="text"
                                               id="businessName"
                                               placeholder="Business Name"
                                               required={true}
                                               onChange={onChange}
                                               value={businessName}
                                               className="form-control"/>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <input type="phone"
                                               id="businessPhone"
                                               placeholder="Business Phone Number"
                                               maxLength={15}
                                               onChange={onChange}
                                               value={businessPhone}
                                               required={true}
                                               className="form-control"/>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <select
                                            id='businessCategory'
                                            className='form-control'
                                            required={true}
                                            onChange={onChange}
                                            value={businessCategory}
                                            placeholder='Select a Business Category'
                                        >
                                            <option value='disable' disabled={true}>
                                                Select a business category
                                            </option>
                                            <option value='book-store'>Book Store</option>
                                            <option value='concert-venue'>Concert Venue</option>
                                            <option value='food-grocery'>Food / Grocery</option>
                                            <option value='hotel'>Hotel</option>
                                            <option value='local-business'>Local Business</option>
                                            <option value='real-estate'>Real Estate</option>
                                            <option value='theatre'>Theatre</option>
                                            <option value='shopping-retail'>Shopping / Retail</option>
                                            <option value='others'>Others</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <select
                                            id='businessPlan'
                                            className='form-control'
                                            required={true}
                                            onChange={onChange}
                                            value={businessPlan}
                                            placeholder='Select a Business Plan'
                                        >
                                            <option value='disable' disabled={true}>
                                                Select a plan
                                            </option>
                                            <option value='level-one'>Level One</option>
                                            <option value='level-two'>Level Two</option>
                                            <option value='level-three'>Level Three</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="justify-content-center">
                                <Col md={10}>
                                    <div className="form-group">
                                        <Button
                                            className="btn btn-md btn-success"
                                            type="submit">
                                            Save Shop
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
            </Container>
            <Plan />
        </>
    )

}

export default ActivateShop
