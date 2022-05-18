import React from "react";
import Hero from "./Hero";
import './styles.css'
import BodySection from "./BodySection";
import Footer from "./Footer";

const Home = () => {

    return(
        <>
            <div className="Home-section">
                <Hero />
                <BodySection />
                <Footer />
            </div>

        </>
    )
}

export default Home
