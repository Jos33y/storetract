import React from "react";
import Hero from "./Hero";
import './styles.css'
import BodySection from "./BodySection";
import FooterSection from "./FooterSection";

const Home = () => {

    return(
        <>
            <div className="Home-section">
                <Hero />
                <BodySection />
                <FooterSection />
            </div>

        </>
    )
}

export default Home
