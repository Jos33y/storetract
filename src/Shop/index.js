import {Col ,Container ,Row} from "react-bootstrap";
import Products from "./Products";
import './styles.css'
import {useEffect ,useRef ,useState} from "react";
import {Link ,useParams} from "react-router-dom";
import {collection ,getDocs ,query ,where ,doc ,getDoc ,orderBy ,limit} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../components/Spinner";
import {getAuth} from "firebase/auth";
import {toast} from "react-toastify";
import ViewCategories from "../Dashboard/viewCategories";

const Shop = () => {
    const params = useParams()

    //console.log(params.shopName)

    const [shopData, setShopData] = useState('')
    const [products, setProducts] = useState(null)
    const [categories, setCategories] = useState(null)
    const [loading, setLoading] = useState(true)
    const isMounted = useRef()

    //Fetch Categories
    const fetchCategories = async () => {
        try
        {
            const catRef = collection(db, 'shops', params.shopName, 'category' )
            const q = query(catRef, orderBy('timestamp', 'desc'))
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
            setLoading(false)
        }
        catch (error) {
            toast.error("could not fetch categories")
            console.log({error})
        }
    }

    //Fetch Products
    const fetchProducts = async () => {
        try
        {
            setLoading(true)
            const prodRef = collection(db, 'shops', params.shopName, 'products')
            const q = query(prodRef)
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
            fetchDetails()
            fetchCategories()
            fetchProducts()
        }
        return () => {
            isMounted.current = false
        }
    }, [isMounted, params.shopName])



    return(
                <>
                    {loading ?
                        (<Spinner />)
                        :
                        (
                            <>
                    <div className="Header">
                        <h5>{shopData.businessName}</h5>

                    </div>
                    <Container>

                        <div className="Categories">
                            <ul>
                                {categories.map((category) =>(
                                    <li key={category.id}>
                                    <Link to={`${category.data.categoryUrl}`} >{category.data.title} </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="Products">
                            {loading ?
                                (<Spinner />)
                                : products && products.length > 0 ?
                                    (
                                        <>
                                        <h6>{products.length} Product(S)</h6>
                            <Row>

                                {products.map((product) => (
                                <Col md={3} key={product.id}>
                                    <Products  product={product.data} />
                                </Col>
                                ))}
                            </Row>
                                        </>
                                    ) :
                                    (<h6>No product available</h6>)
                            }
                        </div>

                    </Container>
                                </>
                        )}
                </>
    )

}

export default Shop
