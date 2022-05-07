import {Container} from "react-bootstrap";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
import React, {useEffect, useRef, useState} from "react";
import {getAuth} from "firebase/auth";
import Spinner from "../../components/Spinner";

const OnBoarding = () => {

    const auth = getAuth()
    const isMounted = useRef()

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
            <Container>
                <h5 className="text-center">
                   Welcome {`${shopData.name}`} OnBoarding Section loading now.
                </h5>
            </Container>
                ) }
        </>
    )
}
export default OnBoarding