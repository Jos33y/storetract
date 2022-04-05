import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import "./Styles.css"
import OrderSummary from "./OrderSummary";
import CheckOutHeader from "./CheckOutHeader";
import ShopFooter from "../components/ShopFooter";
import {Link ,useNavigate ,useParams} from "react-router-dom";
import React, {useEffect ,useRef ,useState} from "react";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";
import {doc ,getDoc ,serverTimestamp ,setDoc ,updateDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
import Spinner from "../../components/Spinner";



const CheckOutInformation = () => {

    const [instructions, setInstructions] = useState()
    const [carts, setCarts] = useState([])
    const [customerID, setCustomerID] = useState("")
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const isMounted = useRef()

    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        country: '',
        state: '',
        city: '',
        deliveryAddress: '',
        phoneNumber: '',
        deliveryNote: '',
        customerId: '',
        timeStamp: '',
    })

    const {email, firstname, lastname, country, state, city, deliveryAddress, phoneNumber, deliveryNote} = formData



    const handleInfo = async (e) => {
        e.preventDefault()
        // console.log(customerID)
        const randId = uuidv4().slice(0,7)
        try {
           if (customerID === formData.customerId ){
               // console.log("available")

               const formDataCopy = {...formData}
               formDataCopy.timeStamp = serverTimestamp()

               const customerRef = doc(db, 'shops', params.shopName, 'customers', customerID)
              await updateDoc(customerRef, formDataCopy)
                   .then(() => {
                       const cartsCopy = {...carts}
                       cartsCopy.customerId = customerID;
                       cartsCopy.timeStamp = serverTimestamp();
                       cartsCopy.instruction = instructions;
                       const cartRef = doc(db, 'shops', params.shopName, 'carts', customerID)
                       updateDoc(cartRef, cartsCopy)
                   })

               toast.success("information updated")
               navigate(`/${params.shopName}/checkout/shipping`)
           }
           else {
               // console.log("not available")
               let customer = (formData.firstname).replace(/[^a-zA-Z ]/g, "");
               let customerUnique = `${(customer).replace(/,?\s+/g, '-')}-${randId}`
               let customerId = customerUnique.toLowerCase()

               //make cart a string and store in local space
               let stringEmail = JSON.stringify(customerId);
               localStorage.setItem("customerID" ,stringEmail)
               // toast.success("stringify")

               console.log("Handling Information")
               const formDataCopy = {...formData}
               formDataCopy.customerId = customerId;
               formDataCopy.timeStamp = serverTimestamp();

               const customerRef = doc(db, 'shops', params.shopName, 'customers', customerId)
               await setDoc(customerRef, formDataCopy)
                   .then(() => {
                       const cartsCopy = {...carts}
                       cartsCopy.customerId = customerId;
                       cartsCopy.timeStamp = serverTimestamp();
                       cartsCopy.instruction = instructions;
                       const cartRef = doc(db, 'shops', params.shopName, 'carts', customerId)
                       setDoc(cartRef, cartsCopy)
                   })
               // console.log({...formDataCopy})
               toast.success("information saved")
               navigate(`/${params.shopName}/checkout/shipping`)
           }

            // navigate(`/${params.shopName}/checkout/shipping`)
        }
      catch (error) {
            console.log({error})
      }
    }

    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        } ))
    }

    const getCustomer = async (CustomerID) =>{

        try {
            const customerRef = doc(db, 'shops', params.shopName, 'customers', CustomerID)
            const customerSnap =  await getDoc(customerRef)

            if(customerSnap.exists()){
                // console.log(customerSnap.data())
                setFormData(customerSnap.data())
                setLoading(false)
            }

        }
        catch (e) {
            console.log({e})
        }

    }


    useEffect(() => {
        if(isMounted) {
            let localInstruction = localStorage.getItem("instruction");
            let localCustomerID = localStorage.getItem("customerID");
            let localCart = localStorage.getItem("cart");


            //turn it into js
            localInstruction = JSON.parse(localInstruction);
            //load persisted cart into state if it exists me
            if (localInstruction) {
                setInstructions(localInstruction)
                 // console.log(instructions)
            }
            localCustomerID = JSON.parse(localCustomerID);
            //load persisted cart into state if it exists
            if (localCustomerID) {
                setCustomerID(localCustomerID)
                getCustomer(localCustomerID)
            }



            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) {
                setCarts(localCart)
                // console.log(carts)
            }



        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.shopName])




    return (
        <>
            { loading ?
                (<Spinner/>) :

                (
                    <>
                    <div className="Checkout">
                        <Container>
                            <Row>
                                <Col md={ 7 }>
                                    <CheckOutHeader active="checkout-info"/>

                                    <div className="Checkout-information">
                                        <Form onSubmit={ handleInfo }>
                                            <h6>Contact Information</h6>
                                            <div className="form-group">
                                                <input type="email"
                                                       id="email"
                                                       onChange={ onChange }
                                                       value={ email }
                                                       required={ true }
                                                       className="form-control"
                                                       maxLength={ 100 }
                                                       placeholder="Email"/>
                                            </div>

                                            <h6>Shipping Address </h6>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md={ 6 }>
                                                        <input type="text"
                                                               id="firstname"
                                                               onChange={ onChange }
                                                               value={ firstname }
                                                               required={ true }
                                                               className="form-control"
                                                               maxLength={ 100 }
                                                               placeholder="First Name"/>
                                                    </Col>
                                                    <Col md={ 6 }>
                                                        <input type="text"
                                                               id="lastname"
                                                               onChange={ onChange }
                                                               value={ lastname }
                                                               required={ true }
                                                               className="form-control"
                                                               maxLength={ 100 }
                                                               placeholder="Last Name"/>
                                                    </Col>
                                                </Row>
                                            </div>

                                            <div className="form-group">
                                                <select name="country"
                                                        className="form-control"
                                                        id="country"
                                                        value={ country }
                                                        required={ true }
                                                        onChange={ onChange }
                                                        placeholder="Select a country">
                                                    <option disabled selected>--Select Country--</option>
                                                    <option value='NIG'>Nigeria</option>
                                                    <option value='GHN'>Ghana</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <Row>
                                                    <Col md={ 6 }>
                                                        <select name="state"
                                                                className="form-control"
                                                                id="state"
                                                                required={ true }
                                                                value={ state }
                                                                onChange={ onChange }>
                                                            <option disabled selected>--Select State--</option>
                                                            <option value="Abia">Abia</option>
                                                            <option value="Adamawa">Adamawa</option>
                                                            <option value="Akwa Ibom">Akwa Ibom</option>
                                                            <option value="Anambra">Anambra</option>
                                                            <option value="Bauchi">Bauchi</option>
                                                            <option value="Bayelsa">Bayelsa</option>
                                                            <option value="Benue">Benue</option>
                                                            <option value="Borno">Borno</option>
                                                            <option value="Cross Rive">Cross River</option>
                                                            <option value="Delta">Delta</option>
                                                            <option value="Ebonyi">Ebonyi</option>
                                                            <option value="Edo">Edo</option>
                                                            <option value="Ekiti">Ekiti</option>
                                                            <option value="Enugu">Enugu</option>
                                                            <option value="FCT">Federal Capital Territory</option>
                                                            <option value="Gombe">Gombe</option>
                                                            <option value="Imo">Imo</option>
                                                            <option value="Jigawa">Jigawa</option>
                                                            <option value="Kaduna">Kaduna</option>
                                                            <option value="Kano">Kano</option>
                                                            <option value="Katsina">Katsina</option>
                                                            <option value="Kebbi">Kebbi</option>
                                                            <option value="Kogi">Kogi</option>
                                                            <option value="Kwara">Kwara</option>
                                                            <option value="Lagos">Lagos</option>
                                                            <option value="Nasarawa">Nasarawa</option>
                                                            <option value="Niger">Niger</option>
                                                            <option value="Ogun">Ogun</option>
                                                            <option value="Ondo">Ondo</option>
                                                            <option value="Osun">Osun</option>
                                                            <option value="Oyo">Oyo</option>
                                                            <option value="Plateau">Plateau</option>
                                                            <option value="Rivers">Rivers</option>
                                                            <option value="Sokoto">Sokoto</option>
                                                            <option value="Taraba">Taraba</option>
                                                            <option value="Yobe">Yobe</option>
                                                            <option value="Zamfara">Zamfara</option>
                                                        </select>
                                                    </Col>
                                                    <Col md={ 6 }>
                                                        <input type="text"
                                                               id="city"
                                                               className="form-control"
                                                               maxLength={ 100 }
                                                               value={ city }
                                                               required={ true }
                                                               onChange={ onChange }
                                                               placeholder="City"/>
                                                    </Col>
                                                </Row>
                                            </div>

                                            <div className="form-group">
                                                <input type="text"
                                                       id="deliveryAddress"
                                                       className="form-control"
                                                       value={ deliveryAddress }
                                                       required={ true }
                                                       onChange={ onChange }
                                                       placeholder="Delivery Address"/>
                                            </div>

                                            <div className="form-group">
                                                <input type="phone"
                                                       id="phoneNumber"
                                                       className="form-control"
                                                       value={ phoneNumber }
                                                       required={ true }
                                                       maxLength={ 20 }
                                                       onChange={ onChange }
                                                       placeholder="Phone Number"/>
                                            </div>
                                            <div className="form-group">
                                        <textarea name="delivery-note"
                                                  className="form-control"
                                                  id="deliveryNote"
                                                  value={ deliveryNote }
                                                  cols="30"
                                                  rows="4"
                                                  onChange={ onChange }
                                                  placeholder="delivery note"></textarea>
                                            </div>

                                            <div className="form-group">
                                                <Row>
                                                    <Col md={ 4 }>
                                                        <Button className="btn btn-md btn-primary"
                                                                type="submit"> Continue to Shipping</Button>
                                                    </Col>
                                                    <Col md={ 4 }>
                                                        <p><Link to={ (`/${ params.shopName }/cart`) }
                                                                 className="link"> Return to Cart</Link></p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form>

                                    </div>
                                </Col>
                                <Col md={ 5 }>
                                    <OrderSummary/>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                <ShopFooter businessName="Johnson Enterprises" />
                </>
                )
            }

        </>
    )

}
export default CheckOutInformation
