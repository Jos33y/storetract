import React ,{useEffect ,useState} from "react";
import './styles.css'
import {Link} from "react-router-dom";
import StoreTractLogo from "../../assets/images/logo-svg.svg";

const HomeNavbar = () => {
    const [hamburgerClicked, setHamburgerClicked] = useState(false)

    const changeBackground = () => {
        console.log(window.scrollY)
        if (window.scrollY >= 80) {
            setHamburgerClicked(true)
        } else {
            setHamburgerClicked(false)
        }
    }

    useEffect(() => {
        changeBackground()
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground)
    }, [])
    return(
        <>
            {/*nav section*/}
            <div className="Home-navbar">
            <div className={hamburgerClicked ? ("Nav-header bg") : ("Nav-header")}>
                <nav id={hamburgerClicked ? ("bg") : ("")} className="navbar fixed-top navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img src={StoreTractLogo} alt="" className="logo-fluid"/>
                        </Link>
                        <button className="navbar-toggler" onClick={() => {
                            setHamburgerClicked((prevState) => !prevState)
                        }} type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="btn btn-md btn-primary" to="/login">Login </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-md btn-success" to="/register">Sign Up </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            </div>
        </>
    )

}
export default HomeNavbar
