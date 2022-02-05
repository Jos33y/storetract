import React ,{useState} from "react";
import HomeNavbar from "../components/HomeNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {doc, setDoc, serverTimestamp, getDoc} from "firebase/firestore"
import {db} from "../firebase.config";

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
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Form className="Form" onSubmit={onSubmit}>
                            <h5>Register Now</h5>
                            <div className="form-group">
                               <Button className="btn btn-md btn-success" disabled={disable} onClick={onGoogleClick}>Register with Google</Button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="sr-only">Full Name</label>
                                <input type="text"
                                       id="name"
                                       value={name}
                                       onChange={onChange}
                                       className="form-control"
                                       required={true}
                                       maxLength={100}
                                       placeholder="Enter Full Name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="sr-only">Business Name</label>
                                <input type="text"
                                       id="businessName"
                                       value={businessName}
                                       onChange={onChange}
                                       className="form-control"
                                       required={true}
                                       maxLength={80}
                                       placeholder="Enter Business Name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input type="email"
                                       id="email"
                                       value={email}
                                       onChange={onChange}
                                       className="form-control"
                                       required={true}
                                       placeholder="Enter Email "/>
                            </div>

                            <div className="form-group" >
                                <label htmlFor="email" className="sr-only">Password</label>
                                <input type="password"
                                       id="password"
                                       value={password}
                                       onChange={onChange}
                                       required={true}
                                       className="form-control"
                                       placeholder="Enter Password"/>
                            </div>

                            <div className="form-group button">
                                <Button className="btn btn-md btn-primary" type="submit">Register</Button>
                            </div>

                            <p> <Link to="/login" className="forget">Login</Link> </p>
                        </Form>
                    </Col>
                    <Col md={4}></Col>

                </Row>
            </Container>
        </>
    )
}

export default Register
