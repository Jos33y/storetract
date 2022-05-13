import React ,{useState} from "react";
import './styles.css'
import HomeNavbar from "../components/HomeNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {getAuth ,signInWithEmailAndPassword } from "firebase/auth";
// import {getDoc, setDoc, doc, serverTimestamp} from "firebase/firestore";
// import {db} from "../firebase.config";
// import GoogleLogo from "../assets/images/google-logo-9808.png"
import LoginOffice from  "../assets/images/4957136.jpg"
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.config";

const Login = () => {

    const navigate = useNavigate()
    const[disable, setDisable]= useState(false)
    const [formData, setFormData] = useState({
        email:'',
        password: '',
    })

    const {email, password} = formData

    const onSubmit = async (e) => {
        setDisable(true)
        e.preventDefault()
       try{
            const auth = getAuth()
           const userCredential =  await signInWithEmailAndPassword(
               auth,
               email,
               password
           )
           if(userCredential.user) {

               // check if user exist
               const docRef = doc(db, 'users', `${userCredential.user.uid}`)
               const docSnap = await getDoc(docRef)
               //if user doesnt exist

               if(docSnap.exists()) {
                   if(!docSnap.data().storeActivated) {
                       navigate('/onboarding/pricing')
                   }
                   else {
                       navigate('/dashboard/home')
                   }
               }
           }
        }
       catch (error) {
            console.log({error})
           toast.error("Can't login user")

       }
       setDisable(false)
    }
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        } ))
    }

    // const onGoogleClick = async () => {
    //     try{
    //         setDisable(true)
    //         const auth = getAuth()
    //         const provider = new GoogleAuthProvider()
    //         const result = await signInWithPopup(auth, provider)
    //         const user = result.user
    //
    //         //check if user exist
    //         const docRef = doc(db, 'users', user.uid)
    //         const docSnap = await getDoc(docRef)
    //
    //         //if user doesnt exist
    //         if(!docSnap.exists()) {
    //             await setDoc(doc(db, 'users', user.uid), {
    //                 name: user.displayName,
    //                 email: email,
    //                 timestamp: serverTimestamp(),
    //             })
    //         }
    //         navigate('/admin-dash')
    //     }
    //     catch (error) {
    //         console.log({error})
    //         toast.error("Can't sign in with google")
    //
    //     }
    //
    // }
    return(
        <>
            <HomeNavbar />
            <Container>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10} className="Auth-box">
                        <Row>
                            <Col md={6}>
                                <div className="Form-image">
                                    <img src={LoginOffice} alt="" className="img-fluid"/>
                                    <p> <Link to="/register" className="register">I don't have a store</Link> </p>

                                </div>
                            </Col>
                            <Col md={6}>
                                <Form className="Form" onSubmit={onSubmit} autocomplete="off">
                                    <h5>Sign in</h5>

                                    <div className="form-group">
                                        <div className="Input-box">
                                            <label htmlFor="email"><i className="fas fa-envelope"></i></label>
                                            <input type="email"
                                                   id="email"
                                                   value={email}
                                                   onChange={onChange}
                                                   required={true}
                                                   placeholder="Your Email"/>
                                        </div>

                                    </div>

                                    <div className="form-group">
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
                                        <Button disabled={disable} className="btn btn-md btn-primary" type="submit">Login</Button>
                                    </div>

                                    <hr/>
                                    {/*<p className="Social-sign-in">Social sign in</p>*/}
                                    {/*<img src={GoogleLogo} alt="" className="Social-sign-in-fluid" disabled={disable} onClick={onGoogleClick}/>*/}
                                    {/*<hr/>*/}
                                    <p> <Link to="/forgot-password" className="forget">Forgot Password</Link> </p>
                                </Form>
                            </Col>


                        </Row>
                    </Col>
                    <Col md={1}></Col>
                </Row>

            </Container>

        </>
    )

}

export default Login
