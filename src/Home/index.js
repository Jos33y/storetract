import React from "react";
// import HomeNavbar from "../components/HomeNavbar";
// import {Spinner} from "react-bootstrap";
import Hero from "./Hero";
import './styles.css'
import BodySection from "./BodySection";

const Home = () => {

    return(
        <>
            {/*hero section and navbar*/}
            <Hero />
            <BodySection />
            {/*<HomeNavbar />*/}
            {/*<div className="Home">*/}
            {/*    <header>*/}
            {/*        <h5>StoreTract In Progress...</h5>*/}
            {/*        <Spinner animation="grow" variant="primary" />*/}
            {/*    </header>*/}
            {/*</div>*/}
        </>
    )
}

export default Home
