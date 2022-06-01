import React, {useEffect, useRef, useState} from "react";
import "./css/styles.css";
import {Container} from "react-bootstrap";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
import {getAuth} from "firebase/auth";
import Spinner from "../../components/Spinner";
import Header from "./components/Header";
import {useNavigate, useParams} from "react-router-dom";
import StorePricing from "./storePricing";
import StoreFree from "./storeFree";
import StorePaid from "./storePaid";
import StorePayment from "./storePayment";
import StoreActivated from "./storeActivated";
import BuyDomain from "./buyDomain";
import Footer from "../../Home/Footer";


const OnBoarding = () => {

    const auth = getAuth()
    const isMounted = useRef()
    const params = useParams()
    const navigate = useNavigate()
    console.log(params.onBoardingUrl)

    const [loading, setLoading] = useState(true)
    const [shopData, setShopData] = useState(null)

    // get user function
    const getUser = async () =>{
        setLoading(true)
        const profileRef = doc(db, 'users', auth.currentUser.uid)
        const profileSnap =  await getDoc(profileRef)

        if(profileSnap.exists()){
            //  console.log(profileSnap.data())
            if (profileSnap.data()){
                setShopData(profileSnap.data())
            }
        }

        setLoading(false)
    }

    //get pages
    const pages = () => {
        if(params.onBoardingUrl === "pricing") {
            return <StorePricing fullName={shopData.name} />
        }
        else if(params.onBoardingUrl === "activate-basic-store") {
            return <StoreFree userId={auth.currentUser.uid} fullName={shopData.name} />
        }
        else if(params.onBoardingUrl === "activate-standard-store") {
            return <StorePaid userId={auth.currentUser.uid} fullName={shopData.name} />
        }
        else if(params.onBoardingUrl === "make-payment") {
            return <StorePayment userId={auth.currentUser.uid} email={shopData.email} />
        }
        else if(params.onBoardingUrl === "store-activated") {
            return <StoreActivated userId={auth.currentUser.uid} />
        }
        else if(params.onBoardingUrl === "buy-domain") {
            return <BuyDomain userId={auth.currentUser.uid} />
        }
        else {
            navigate("/404")
        }
    }
    useEffect(() => {
        if(isMounted) {
            getUser().then()
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, auth.currentUser.uid])

    return(
        <>
            {loading ?
                (<Spinner />) : (
                    <div className="on-boarding-main">
                        <Header />
                        <Container>
                            {pages()}
                        </Container>
                        <Footer />
                    </div>
                ) }
        </>
    )
}
export default OnBoarding