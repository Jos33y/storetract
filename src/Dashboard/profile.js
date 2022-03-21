import './styles.css'
import AdminNavbar from "../components/AdminNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import {useEffect ,useState} from "react";
import {getAuth ,updateProfile} from "firebase/auth";
import {updateDoc ,doc ,getDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";


const AdminProfile = () => {
    const auth = getAuth()
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        businessName: '',
        phoneNumber: parseInt(''),
    })
    const {name, email, businessName, phoneNumber, shopActivated} = formData

    const onSubmit = async () => {
        try{
            if(auth.currentUser.displayName !== name){
                // update display name in firebase
                await updateProfile(auth.currentUser, {
                    displayName: name,
                })
            }
            console.log({...formData})
            //update in firestore
            const formDataCopy = {...formData}
            formDataCopy.shopActivated = false
            formDataCopy.phoneNumber = Number(formData.phoneNumber)
            const userRef = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userRef, formDataCopy)
            toast.success("profile changes saved successfully")
        }
        catch (error) {
            console.log({error})
            toast.error("can't save profile changes")

        }

    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    useEffect(() => {
        const getUser = async () =>{
            const auth = getAuth()
            const profileRef = doc(db, 'users', auth.currentUser.uid)
            const profileSnap =  await getDoc(profileRef)

            if(profileSnap.exists()){
                console.log(profileSnap.data())
                setFormData(profileSnap.data())
            }
        }
        getUser()
    }, [auth.currentUser.uid])
    return(
        <>
            <AdminNavbar />
            <Container className="Profile">
                <h5>View Profile</h5>
                {shopActivated ?
                    (<Button className="btn btn-md btn-primary">View Shop Profile</Button>)
                    :
                    (<Link to="/activate-shop" className="btn btn-md btn-success">Activate Shop</Link>)
                }
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Form className="Profile-form">
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <input type="text"
                                               id="name"
                                               placeholder="Full Name"
                                               required={true}
                                               value={name}
                                               disabled={!changeDetails}
                                               onChange={onChange}
                                               readOnly={changeDetails ? false : true}
                                               className="form-control"/>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <input type="email"
                                               id="email"
                                               maxLength={100}
                                               value={email}
                                               required={true}
                                               placeholder="Email Address"
                                               disabled={!changeDetails}
                                               readOnly={changeDetails ? false : true}
                                               className="form-control"/>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <input type="text"
                                               id="businessName"
                                               required={true}
                                               name="businessName"
                                               value={businessName}
                                               placeholder="Business Name"
                                               disabled={!changeDetails}
                                               onChange={onChange}
                                               readOnly={changeDetails ? false : true}
                                               className="form-control"/>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <input type="phone"
                                               id="phoneNumber"
                                               name="phoneNumber"
                                               maxLength={15}
                                               required={true}
                                               value={phoneNumber}
                                               placeholder="Phone Number"
                                               disabled={!changeDetails}
                                               onChange={onChange}
                                               readOnly={changeDetails ? false : true}
                                               className="form-control"/>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="justify-content-center">
                                <Col md={10}>
                                    <div className="form-group">
                                        <Button
                                            className={`btn btn-md ${changeDetails ? 'btn-success' : 'btn-primary'}`}
                                            onClick={() => {
                                                changeDetails && onSubmit()
                                                setChangeDetails((prevState) => !prevState)
                                            }}>
                                            {changeDetails ? 'Save Profile' : 'Edit Profile'}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AdminProfile
