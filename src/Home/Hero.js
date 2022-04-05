import {Link} from "react-router-dom";
import React ,{useEffect ,useState} from "react";
import {Col ,Row} from "react-bootstrap";
import StoreTractLogo from "../assets/images/logo-svg.svg";
import HeroImage from "../assets/images/store-tract-hero.svg";
import RubberBand from "react-reveal/RubberBand";
import Jello from "react-reveal/Jello";
import Shake from "react-reveal/Shake";
const Hero = () => {
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
    return (
        <>
            <div className="Hero">
            {/*nav section*/}
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
            <div className="Hero-section">
                <Row>
                    <Col md={6}>
                        <div className="Hero-text">
                            <RubberBand>
                                <h2> Create a free online store in an instant</h2>
                            </RubberBand>
                            <Shake>
                                <hr className="line"/>
                                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore </p>
                                <Link to="/register" className="btn btn-md btn-primary"> Get started for free</Link>
                            </Shake>

                        </div>

                    </Col>
                    <Col md={6}>
                        <Jello>
                            <div className="Hero-image">
                                <img src={HeroImage} alt="hero-box" className="hero-fluid"/>
                            </div>
                        </Jello>

                    </Col>
                </Row>

            </div>
            </div>
        </>
    )

}

export default Hero
