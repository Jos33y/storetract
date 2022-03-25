import {Link ,useParams} from "react-router-dom";
import ShopHeader from "./components/ShopHeader";
import CategorySection from "./components/CategorySection";
import {useEffect ,useRef ,useState} from "react";
import {collection ,doc ,getDoc ,getDocs ,query ,where} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../components/Spinner";
import ShopFooter from "./components/ShopFooter";
import {Col ,Container ,Row} from "react-bootstrap";
import {toast} from "react-toastify";
import ProductCard from "./components/ProductCard";

const ShopCategories = () => {
    const params = useParams()

    const [shopData, setShopData] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const isMounted = useRef()


    //Fetch Categories
    const fetchCategory = async () => {
        try
        {

            const docRef = doc(db, "shops", params.shopName, 'category', params.categoryUrl )
            const docSnap = await getDoc(docRef );

            if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data());
                setCategoryName(docSnap.data())


            } else {
                console.log("No such document!");
            }
        }
        catch (error) {
            console.log({error})
        }
    }

    //Fetch Product
    const fetchProducts = async () => {
        try
        {

            const prodRef = collection(db, 'shops', params.shopName, 'products')
            const q = query(prodRef, where("productCategory", "==", params.categoryUrl))
            const querySnap = await getDocs(q)
            let products = []
            querySnap.forEach((doc) => {
                console.log(doc.data());
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
            fetchProducts()
            fetchDetails()
            fetchCategory()

        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.categoryUrl])


    return(
        <>
            {loading ?
                (<Spinner />)
                :
                (
                    <>
                        <ShopHeader businessName={shopData.businessName} businessUrl={params.shopName} />
                        <CategorySection shopName={params.shopName}/>
                        <Container className="Category-page">
                            <div className='bread-crumb'>
                                <ul>
                                    <li>
                                        <Link to="" className="bread-crumb-link"> Home</Link>
                                    </li> |
                                    <li>
                                        <Link to="" className="bread-crumb-link"> {categoryName.title}</Link>
                                    </li>
                                </ul>
                            </div>
            <h3 className="category-title">{categoryName.title}</h3>

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

export default ShopCategories
