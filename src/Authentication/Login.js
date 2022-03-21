import React ,{useState} from "react";
import './styles.css'
import HomeNavbar from "../components/HomeNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import {Link ,useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {getAuth ,GoogleAuthProvider ,signInWithEmailAndPassword ,signInWithPopup} from "firebase/auth";
import {getDoc, setDoc, doc, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase.config";

const Login = () => {

    const[disable, setDisable]= useState(false)
    const [formData, setFormData] = useState({
        email:'',
        password: '',
    })

    const {email, password} = formData
    const navigate = useNavigate()
    const onSubmit = async (e) => {
        e.preventDefault()
       try{
            const auth = getAuth()
           const userCredential =  await signInWithEmailAndPassword(
               auth,
               email,
               password
           )
           if(userCredential.user) {
               navigate('/admin-dash')
           }
       }
       catch (error) {
            console.log({error})
           toast.error("Can't login user")

       }
    }
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        } ))
    }

    const onGoogleClick = async () => {
        try{
            setDisable(true)
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            //check if user exist
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            //if user doesnt exist
            if(!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: email,
                    timestamp: serverTimestamp(),
                })
            }
            navigate('/admin-dash')
        }
        catch (error) {
            console.log({error})
            toast.error("Can't sign in with google")

        }

    }
    return(
        <>
            <HomeNavbar />
            <Container>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Form className="Form" onSubmit={onSubmit}>
                            <h5>Login</h5>

                            <div className="form-group">
                                <Button className="btn btn-md btn-success" disabled={disable} onClick={onGoogleClick}>Google Sign In</Button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input type="email"
                                       id="email"
                                       value={email}
                                       onChange={onChange}
                                       required={true}
                                       className="form-control"
                                       placeholder="Enter Email Address"/>
                            </div>

                            <div className="form-group">
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
                              <Button className="btn btn-md btn-primary" type="submit">Sign In</Button>
                            </div>

                            <p> <Link to="/forgot-password" className="forget">Forgot Password</Link> </p>
                        </Form>
                    </Col>
                    <Col md={4}></Col>

                </Row>
            </Container>

        </>
    )

}

export default Login
