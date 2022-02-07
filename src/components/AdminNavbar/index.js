import React ,{useEffect ,useState} from "react";
import './styles.css'
import {Link ,useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {doc ,getDoc} from "firebase/firestore";
import {db} from "../../firebase.config";

const AdminNavbar = () => {

    const [shopActivated, setShopActivated] = useState(false)

    const auth = getAuth()
    const navigate = useNavigate()
    const logOut = () => {
        auth.signOut()
        navigate('/login')
    }
    useEffect(() => {
        const getUser = async () =>{
            const profileRef = doc(db, 'users', auth.currentUser.uid)
            const profileSnap =  await getDoc(profileRef)

            if(profileSnap.exists()){
              //  console.log(profileSnap.data())
                setShopActivated(profileSnap.data().shopActivated)
            }
        }
        getUser()
    }, [auth.currentUser.uid])
    return(
        <>
            <div className="Admin-navbar">
                <ul>
                    <li><Link className="navbar-brand" to="/admin-dash"> Dashboard </Link> </li>
                    <div className="buttons">
                        <li><Link className="btn btn-sm btn-primary" to="/insert-category">Category </Link> </li>
                        <li><Link className="btn btn-md btn-success" to="/insert-product">Products </Link></li>
                        <li><Link className="btn btn-md btn-success" to="/admin-profile">View Profile </Link></li>

                        {
                            shopActivated ?
                                ( <li><Link target="_blank" rel="noopener noreferrer" className="btn btn-md btn-secondary" to={`/${auth.currentUser.uid}`}>View Shop </Link> </li>)
                               :
                                ( <li><Link className="btn btn-md btn-secondary" to="/activate-shop">Activate Shop </Link> </li>)

                        }
                        <li><Link className="btn btn-sm btn-danger" onClick={logOut} to="/">Log Out </Link></li>
                    </div>
                </ul>
            </div>
        </>
    )

}
export default AdminNavbar
