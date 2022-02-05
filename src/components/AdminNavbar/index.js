import React from "react";
import './styles.css'
import {Link ,useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";

const AdminNavbar = () => {

    const auth = getAuth()
    const navigate = useNavigate()
    const logOut = () => {
        auth.signOut()
        navigate('/login')
    }
    return(
        <>
            <div className="Admin-navbar">
                <ul>
                    <li><Link className="navbar-brand" to="/admin-dash"> Dashboard </Link> </li>
                    <div className="buttons">
                        <li><Link className="btn btn-md btn-primary" to="/insert-category">Insert Category </Link> </li>
                        <li><Link className="btn btn-md btn-success" to="/admin-profile">View Profile </Link></li>
                        <li><Link className="btn btn-md btn-secondary" to="/activate-shop">Activate Shop </Link> </li>
                        <li><Link className="btn btn-md btn-danger" onClick={logOut} to="/">Log Out </Link></li>
                    </div>
                </ul>
            </div>
        </>
    )

}
export default AdminNavbar
