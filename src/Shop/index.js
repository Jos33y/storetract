
import './css/styles.css'
import React, {useEffect ,useRef ,useState} from "react";
import {useParams} from "react-router-dom";
import {collection, getDocs, query, doc, getDoc, limit, orderBy} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../components/Spinner";
import {toast} from "react-toastify";
import ShopHeader from "./components/ShopHeader";
import ShopFooter from "./components/ShopFooter";
import ShopHome from "./pages/shopHome";
import ShopProductDetails from "./pages/shopProductDetails";
import ShopCart from "./pages/cart";
import ShopProducts from "./pages/products";
import ShopCheckout from "./pages/checkout";
import ShopPayment from "./pages/checkout/shopPayment";
import ShopOrderConfirmation from "./pages/checkout/shopOrderConfirmation";
import TrackOrder from "./pages/trackOrder";
import ShopCategories from "./pages/categories";

const Shop = () => {
    const params = useParams()
    //console.log(params.shopName)

    const [shopData ,setShopData] = useState('')
    const [products ,setProducts] = useState(null)
    const [categories, setCategories] = useState([])
    const [loading ,setLoading] = useState(true)
    const [confirmed, setConfirmed] = useState(false);
    const isMounted = useRef()
    const [domain, setDomain] = useState(false)
    const [ShopURL ,setShopURL] = useState(params.shopName)


    const currentURL = window.location.href;
    const currentEdited = (currentURL).toString().replace(/[^a-zA-Z0-9]/g ,'')


    const confirmUrl = async (storeURL) => {
      try {
          const shopRef = doc(db ,"shops" , storeURL)
          const shopSnap = await getDoc(shopRef);

          if (shopSnap.exists()) {
              setConfirmed(true)

          } else {
              setConfirmed(false)
              console.log("page not loading")
          }

      }
      catch (e) {
          console.log({e})
      }

    }

    //Fetch Product
    const fetchProducts = async (storeURL) => {

        try {
            const prodRef = collection(db ,'shops' , storeURL, 'products')
            const q = query(prodRef, limit(4))
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

    //Fetch Categories
    const fetchCategories = async (shopName) => {
        try
        {
            const catRef = collection(db, 'shops', shopName, 'category' )
            const q = query(catRef, orderBy('timestamp', 'asc'))
            const querySnap = await getDocs(q)
            let categories = [];
            querySnap.forEach((doc) => {
                //console.log(doc.data())
                return categories.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setCategories(categories)
        }
        catch (error) {
            toast.error("could not fetch categories")
            console.log({error})
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
                confirmUrl(docSnap.data().shopUrl)
                fetchDetails(docSnap.data().shopUrl)
                fetchProducts(docSnap.data().shopUrl)


            } else {
                console.log("No such URL Found !");
                setShopURL(params.shopName)
                setDomain(false)
                confirmUrl(params.shopName)
                fetchDetails(params.shopName)
                fetchProducts(params.shopName)
                fetchCategories(params.shopName)
            }

            setLoading(false)
        } catch (error) {
            console.log({error})
        }

    }


    const pages = () => {
        if (confirmed) {

            if(params.shopName && params.productUrl) {
                return <ShopProductDetails businessUrl={ShopURL} loading={loading}/>
            }
            else if(params.indexUrl === "track-order") {
                return <TrackOrder businessUrl={ShopURL} loading={loading}/>
            }
            else if(params.indexUrl === "category") {
                return <ShopCategories businessUrl={ShopURL} loading={loading}/>
            }
           else if(params.indexUrl === "cart") {
                return <ShopCart businessUrl={ShopURL} loading={loading}/>
            }
            else if(params.indexUrl === "products") {
                return <ShopProducts businessUrl={ShopURL} loading={loading}/>
            }
            else if(params.indexUrl === "checkout" && params.checkoutUrl === "information") {
                return <ShopCheckout businessUrl={ShopURL} loading={loading}/>
            }
            else if(params.indexUrl === "checkout" && params.checkoutUrl === "payment") {
                return <ShopPayment businessUrl={ShopURL} loading={loading}/>
            }
            else if(params.indexUrl === "checkout" && params.checkoutUrl === "order-confirmation") {
                return <ShopOrderConfirmation businessUrl={ShopURL} loading={loading}/>
            }
            else if(params.shopName) {
                return <ShopHome businessUrl={ShopURL} products={products} loading={loading} />
            }
        }
        else{
            return <h5 className="text-center"> error page </h5>;
        }
    }

    useEffect(() => {
        if (isMounted) {

            fetchUrl()

        }
        return () => {
            isMounted.current = false;
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
                            <div className="body">
                            <ShopHeader businessName={ shopData.businessName } businessUrl={ ShopURL } domain={domain} categories={categories}/>
                               <div className="main-section">

                                   {pages()}

                               </div>
                                <ShopFooter businessName={ shopData.businessName }/>
                            </div>


                            {/*<div className="Shop-hero">*/}
                           {/*    <h1>Welcome to {shopData.businessName}</h1>*/}
                           {/*    <img src={HeroImage} alt="" className="img-fluid"/>*/}
                           {/*</div>*/}

                            {/*<Auth businessUrl={ShopURL} />*/}
                            {/*<Row>*/}
                            {/*    <Col md={3} className="side-bar">*/}
                            {/*        <CategorySection shopName={ ShopURL }/>*/}
                            {/*    </Col>*/}
                            {/*    <Col md={9}>*/}

                            {/*        <ShopHome businessUrl={ShopURL} products={products} loading={loading} />*/}
                            {/*    </Col>*/}
                            {/*</Row>*/}


                        </>
                    ) }
            </>
        )


}

export default Shop
