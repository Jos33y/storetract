import React ,{useEffect ,useState} from "react";
import './styles.css'
import {Link ,useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {doc ,getDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
import PackLogo from "../../assets/images/packnow.jpg"

const AdminNavbar = () => {

    const [shopActivated, setShopActivated] = useState(false)
    const [shopURl, setShopURL] = useState('')
    const [loading, setLoading] = useState(true)
    const auth = getAuth()
    const navigate = useNavigate()
    const logOut = () => {
        auth.signOut()
        navigate('/login')
    }
    useEffect(() => {
        const getUser = async () =>{
            setLoading(true)
            const profileRef = doc(db, 'users', auth.currentUser.uid)
            const profileSnap =  await getDoc(profileRef)

            if(profileSnap.exists()){
              //  console.log(profileSnap.data())
                setShopURL(profileSnap.data().shopUrl)
                setShopActivated(profileSnap.data().shopActivated)
                setLoading(false)

            }
            else {
                setShopActivated(false)
            }
        }
        getUser()
    }, [auth.currentUser.uid])
    return(
        <>
            <div className="Admin-navbar">
                <ul>
                    <li><Link className="navbar-brand" to="/admin-dash">
                        <img src={PackLogo} alt="" className="logo-fluid"/>
                        Dashboard
                    </Link> </li>
                    <div className="buttons">
                        <li><Link className="btn btn-sm btn-primary" to="/insert-category">Category </Link> </li>
                        <li><Link className="btn btn-md btn-success" to="/insert-product">Products </Link></li>
                        <li><Link className="btn btn-md btn-success" to="/admin-profile">View Profile </Link></li>

                        {loading ? (<button className="btn btn-md btn-secondary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>) :
                            (
                                shopActivated ?
                                    ( <li><Link target="_blank" rel="noopener noreferrer" className="btn btn-md btn-secondary" to={`/${shopURl}`}>View Shop </Link> </li>)
                                    :
                                    ( <li><Link className="btn btn-md btn-secondary" to="/activate-shop">Activate Shop </Link> </li>)

                            )
                        }

                        {

                        }
                        <li><Link className="btn btn-sm btn-danger" onClick={logOut} to="/">Log Out </Link></li>
                    </div>
                </ul>
            </div>
        </>
    )

}
export default AdminNavbar
