import {Col ,Container ,Row} from "react-bootstrap";
import ProductCard from "./components/ProductCard";
import './styles.css'
import {useEffect ,useRef ,useState} from "react";
import {useParams} from "react-router-dom";
import {collection ,getDocs ,query ,doc ,getDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../components/Spinner";
import {toast} from "react-toastify";
import ShopHeader from "./components/ShopHeader";
import ShopFooter from "./components/ShopFooter";
import CategorySection from "./components/CategorySection";
import ShopNavHeader from "./components/ShopNavHeader";

const Shop = () => {
    const params = useParams()

    //console.log(params.shopName)

    const [shopData, setShopData] = useState('')
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    const isMounted = useRef()
    let localCart = localStorage.getItem("cart");

    //Fetch Product
    const fetchProducts = async () => {
        try
        {
            setLoading(true)
            const prodRef = collection(db, 'shops', params.shopName, 'products')
            const q = query(prodRef)
            const querySnap = await getDocs(q)
            let products = []
            querySnap.forEach((doc) => {
                //console.log(doc.data());
                return products.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setProducts(products)
            setLoading(false)

        }
        catch (error) {
            console.log({error})
            toast.error("Unable to retrieve products")

        }
    }

    useEffect(() => {
        if(isMounted) {
            const fetchDetails = async () => {
                try
                {
                    const docRef = doc(db, "shops", params.shopName)
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        //console.log("Document data:", docSnap.data());
                        setShopData(docSnap.data())

                    } else {
                        console.log("No such document!");
                    }
                }
                catch (error) {
                    console.log({error})
                }
            }
            fetchDetails()
            // fetchCategories()
            fetchProducts()
            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) setCart(localCart)
            // console.log(localCart)
            console.log(cart.length)
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.shopName])



    return(
                <>
                    {loading ?
                        (<Spinner />)
                        :
                        (
                            <>
                                <ShopNavHeader cartCount={cart.length} businessUrl={params.shopName} />
                                <ShopHeader businessName={shopData.businessName} businessUrl={params.shopName} />
                                <CategorySection shopName={params.shopName}/>
                    <Container>

                        <div className="Shop-products">
                            {loading ?
                                (<Spinner />)
                                : products && products.length > 0 ?
                                    (
                                        <>
                                        <h6 className="small">{products.length} Product(s)</h6>
                            <Row>

                                {products.map((product) => (
                                <Col md={3} key={product.id}>
                                    <ProductCard id={product.id} product={product.data} businessUrl={params.shopName} />
                                </Col>
                                ))}
                            </Row>
                                        </>
                                    ) :
                                    (<h6>No product available</h6>)
                            }
                        </div>

                    </Container>

                                <ShopFooter businessName={shopData.businessName}/>
                                </>
                        )}
                </>
    )

}

export default Shop
