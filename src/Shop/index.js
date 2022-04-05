
import './styles.css'
import React, {useEffect ,useRef ,useState} from "react";
import {useParams} from "react-router-dom";
import {collection ,getDocs ,query ,doc ,getDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../components/Spinner";
import {toast} from "react-toastify";
import ShopHeader from "./components/ShopHeader";
import ShopFooter from "./components/ShopFooter";
import CategorySection from "./components/CategorySection";
import ShopHome from "./ShopHome";
import {Col ,Row} from "react-bootstrap";
import HeroImage from "../assets/images/224_UG9kaXVtMi0wMQ.jpg"

const Shop = () => {
    const params = useParams()
    //console.log(params.shopName)

    const [shopData ,setShopData] = useState('')
    const [products ,setProducts] = useState(null)
    const [loading ,setLoading] = useState(true)
    const [cart ,setCart] = useState([])
    const isMounted = useRef()
    const [domain, setDomain] = useState(false)
    const [ShopURL ,setShopURL] = useState(params.shopName)


    const currentURL = window.location.href;
    const currentEdited = (currentURL).toString().replace(/[^a-zA-Z0-9]/g ,'')


    //Fetch Product
    const fetchProducts = async (storeURL) => {

        try {
            const prodRef = collection(db ,'shops' , storeURL, 'products')
            const q = query(prodRef)
            const querySnap = await getDocs(q)
            let products = []
            querySnap.forEach((doc) => {
                //console.log(doc.data());
                return products.push({
                    id: doc.id ,
                    data: doc.data() ,
                })
            })
            setProducts(products)
        } catch (error) {
            console.log({error})

            toast.error("Unable to retrieve products")

        }
    }


    const fetchDetails = async (storeURL) => {

        try {
            const docRef = doc(db ,"shops" ,storeURL)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data());
                setShopData(docSnap.data())

            } else {
                console.log(storeURL)
                console.log("No such Details Found!");

            }
        } catch (error) {
            console.log({error})
        }
    }

    const fetchUrl = async () => {
        try {
            const urlRef = doc(db ,"domains" ,currentEdited)
            const docSnap = await getDoc(urlRef);

            if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data());
                setShopURL(docSnap.data().shopUrl)
                setDomain(true)
                console.log(docSnap.data().shopUrl)
                fetchDetails(docSnap.data().shopUrl)
                fetchProducts(docSnap.data().shopUrl)


            } else {
                console.log("No such URL Found !");
                setShopURL(params.shopName)
                setDomain(false)
                fetchDetails(params.shopName)
                fetchProducts(params.shopName)
            }

            setLoading(false)
        } catch (error) {
            console.log({error})
        }

    }

    useEffect(() => {
        if (isMounted) {
            let localCart = localStorage.getItem("cart");

            fetchUrl()


            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) setCart(localCart)
            // console.log(localCart)
            // console.log(cart.length)
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[isMounted ,params.shopName])


        return (
            <>
                { loading ?
                    (<Spinner/>)
                    :
                    (
                        <>
                            <ShopHeader cartCount={ cart.length } businessName={ shopData.businessName } businessUrl={ ShopURL } domain={domain}/>
                           <div className="Shop-hero">
                               <h1>Welcome to {shopData.businessName}</h1>
                               <img src={HeroImage} alt="" className="img-fluid"/>
                           </div>

                            {/*<Auth businessUrl={ShopURL} />*/}
                            <Row>
                                <Col md={3} className="side-bar">
                                    <CategorySection shopName={ ShopURL }/>
                                </Col>
                                <Col md={9}>

                                    <ShopHome businessUrl={ShopURL} products={products} loading={loading} />
                                </Col>
                            </Row>

                            <ShopFooter businessName={ shopData.businessName }/>
                        </>
                    ) }
            </>
        )


}

export default Shop
