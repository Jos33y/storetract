import React ,{useState} from "react";
import HomeNavbar from "../components/HomeNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {doc, setDoc, serverTimestamp, getDoc} from "firebase/firestore"
import {db} from "../firebase.config";
import RegisterOffice from "../assets/images/22Z_2012.w003.n001.69B.p12.69.jpg";
import GoogleLogo from "../assets/images/google-logo-9808.png";

const Register = () => {

    const[disable, setDisable]= useState(false)
    const[formData, setFormData] = useState({
        name: '',
        businessName: '',
        email: '',
        password: '',
    })
    const {email, password, name, businessName} = formData;
    const navigate = useNavigate()


    const onSubmit = async (e) => {
        e.preventDefault()
        console.log("Registration Working")
        try{
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user
            updateProfile(auth.currentUser, {
                displayName: name,
            })
            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/admin-dash')
        }
        catch (error) {
            toast.error("couldn't sign in user")
            console.log({error})

        }

    }
    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onGoogleClick = async () => {
        try {
            setDisable(true)
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            //check if user a exist
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            //if user doesnt exist create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                })
            }
            navigate('/admin-dash')
        } catch (error) {
            toast.error('unable to sign in with google')
        }
    }

    return(
        <>
            <HomeNavbar />
            <Container >
                <Row>
                    <Col md={1}></Col>
                    <Col md={10} className="Auth-box">
                        <Row>
                            <Col md={6}>
                                <Form className="Form" onSubmit={onSubmit} autocomplete="off">
                                    <h5>Sign up</h5>
                                    <div className="form-group">
                                        <div className="Input-box">
                                            <label htmlFor="full-name"><i className="fas fa-user"></i></label>
                                            <input type="text"
                                                   id="name"
                                                   value={name}
                                                   onChange={onChange}
                                                   required={true}
                                                   maxLength={100}
                                                   placeholder="Your Full Name"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="Input-box">
                                            <label htmlFor="email"><i className="fas fa-briefcase"></i></label>
                                            <input type="text"
                                                   id="businessName"
                                                   value={businessName}
                                                   onChange={onChange}
                                                   required={true}
                                                   maxLength={80}
                                                   placeholder="Your Business Name"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="Input-box">
                                            <label htmlFor="email"><i className="fas fa-envelope"></i></label>
                                            <input type="email"
                                                   id="email"
                                                   value={email}
                                                   onChange={onChange}
                                                   required={true}
                                                   placeholder="Your Email "/>
                                        </div>
                                    </div>

                                    <div className="form-group" >
                                        <div className="Input-box">
                                            <label htmlFor="email"><i className="fas fa-lock"></i></label>
                                            <input type="password"
                                                   id="password"
                                                   value={password}
                                                   onChange={onChange}
                                                   required={true}
                                                   placeholder="Password"/>
                                        </div>
                                    </div>

                                    <div className="form-group button">
                                        <Button className="btn btn-md btn-primary" type="submit">Register</Button>
                                    </div>

                                    <hr/>
                                    <p className="Social-sign-in">Social sign up</p>
                                    <img src={GoogleLogo} alt="" className="Social-sign-in-fluid" disabled={disable} onClick={onGoogleClick}/>
                                    <hr/>
                                </Form>
                            </Col>
                            <Col md={6}>
                                <div className="Form-image">
                                    <img src={RegisterOffice} alt="" className="img-register"/>
                                    <p> <Link to="/login" className="register">I have a store</Link> </p>

                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={1}></Col>
                </Row>
            </Container>
        </>
    )
}

export default Register
