
import '../css/styles.css';
import '../css/storeone.css';
import React, {useEffect ,useRef ,useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {collection, getDocs, query, doc, getDoc, limit, orderBy} from "firebase/firestore";
import {db} from "../config/firebase.config";
import Spinner from "../components/Spinner";
import {toast} from "react-toastify";
import ShopHeader from "../components/ShopHeader";
import ShopFooter from "../components/ShopFooter";
import ShopHome from "./shopHome";
import ShopProductDetails from "./shopProductDetails";
import ShopCart from "./cart";
import ShopProducts from "./products";
import ShopCheckout from "./checkout";
import ShopPayment from "./checkout/shopPayment";
import ShopOrderConfirmation from "./checkout/shopOrderConfirmation";
import TrackOrder from "./trackOrder";

const Shop = ({storeUrl}) => {
    const params = useParams()
    const navigate = useNavigate();
    const isMounted = useRef()
    const [shopData ,setShopData] = useState([])
    const [products ,setProducts] = useState(null)
    const [categories, setCategories] = useState([])
    const [loading ,setLoading] = useState(true)
    const [ShopURL ,setShopURL] = useState(storeUrl)

// webhook: https://hooks.slack.com/services/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

    const confirmUrl = async (URL) => {
        try {
            const shopRef = doc(db ,"shops", `${URL}`)
            const shopSnap = await getDoc(shopRef);
            // console.log("domain url:", URL)
            if (shopSnap.exists()) {
                //console.log("Document data:", shopSnap.data());
                setShopData(shopSnap.data())
            }
            else {
                console.log(storeUrl)
                console.log("No such Details Found!");
            }
        }
        catch (e) {
            console.log({e})
        }
    }

    //Fetch Product
    const fetchProducts = async (URL) => {
        try {
            const prodRef = collection(db ,'shops' , `${URL}`, 'products')
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
    const fetchCategories = async (URL) => {
        try
        {
            const catRef = collection(db, 'shops', `${URL}`, 'categories' )
            const q = query(catRef, orderBy('timeStamp', 'asc'), limit(3))
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

    const fetchUrl = async () => {
        // console.log("store url: ", storeUrl);
        try {
            setLoading(true)
            if (storeUrl) {
                setShopURL(storeUrl)
                confirmUrl(storeUrl).then(() => {
                    fetchProducts(storeUrl)
                    fetchCategories(storeUrl)
                })
            }
            else{
             navigate('https://storetract.com')
            }
        } catch (error) {
            console.log({error})
        }
        setLoading(false)
    }

    const pages = () => {

            if(storeUrl && params.productUrl) {
                return <ShopProductDetails businessUrl={ShopURL} loading={loading} />
            }
            else if(params.indexUrl === "track-order") {
                return <TrackOrder businessUrl={ShopURL} loading={loading} />
            }
            else if(params.categoryUrl) {
                return <ShopProducts businessUrl={ShopURL} loading={loading} />
            }
            else if(params.indexUrl === "cart") {
                return <ShopCart businessUrl={ShopURL} loading={loading}/>
            }
            else if(params.indexUrl === "products") {
                return <ShopProducts businessUrl={ShopURL} loading={loading} />
            }
            else if(params.checkoutUrl === "information") {
                return <ShopCheckout businessUrl={ShopURL} loading={loading} />
            }
            else if(params.checkoutUrl === "payment") {
                return <ShopPayment storeData={shopData} businessUrl={ShopURL} loading={loading} />
            }
            else if(params.checkoutUrl === "order-confirmation") {
                return <ShopOrderConfirmation businessUrl={ShopURL} loading={loading} />
            }
            else if(storeUrl) {
                return <ShopHome shopData={shopData} products={products} loading={loading} categories={categories} />
            }
        else{

            return <h5 className="text-center"> error page </h5>;
        }
    }

    useEffect(() => {
        if (isMounted) {
            fetchUrl().then()
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[isMounted, storeUrl])


    return (
        <>
            <div className="body">
                { loading ?
                    (<Spinner/>) : (
                        <>
                            <ShopHeader businessName={ shopData.businessName } businessUrl={ ShopURL } categories={categories}/>
                            <div className="main-section">
                                {pages()}
                            </div>
                            <ShopFooter shopData={shopData}/>
                        </> ) }
            </div>
        </>
    )

}

export default Shop
