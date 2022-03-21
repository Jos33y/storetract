import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import {Spinner} from "react-bootstrap";

const Home = () => {

    return(
        <>
            <HomeNavbar />
            <div className="Home">
                <header>
                    <h5>StoreTract In Progress...</h5>
                    <Spinner animation="grow" variant="primary" />
                </header>
            </div>
        </>
    )
}

export default Home
