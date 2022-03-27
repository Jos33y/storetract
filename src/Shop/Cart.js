import Spinner from "../components/Spinner";
import ShopNavHeader from "./components/ShopNavHeader";
import ShopHeader from "./components/ShopHeader";
import CategorySection from "./components/CategorySection";
import React ,{useEffect ,useRef ,useState} from "react";
import {Col ,Row ,Table} from "react-bootstrap";
import ProductCard from "./components/ProductCard";
import ShopFooter from "./components/ShopFooter";
import {collection ,doc ,getDoc ,getDocs ,limit ,query} from "firebase/firestore";
import {db} from "../firebase.config";
import {Link ,useParams} from "react-router-dom";
import {toast} from "react-toastify";
import ShirtImage from "../assets/images/stripe-shirt.jpg"

const Cart = () => {


    const params = useParams()

    // const [display, setDisplay] = useState(false);
    // const [disabled, setDisabled] = useState(false)
    const [shopData, setShopData] = useState('')
    const [products, setProducts] = useState(null)
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)

    const isMounted = useRef()
    let localCart = localStorage.getItem("cart");


    //Fetch Product
    const fetchProducts = async () => {
        try
        {

            const prodRef = collection(db, 'shops', params.shopName, 'products')
            const q = query(prodRef, limit(5))
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
    }, [isMounted, params.productUrl])



    return (
        <>
            {loading ?
                (<Spinner />)
                :
                (
                    <>
                        <ShopNavHeader cartCount={cart.length} businessUrl={params.shopName} />
                        <ShopHeader businessName={shopData.businessName} businessUrl={params.shopName} />
                        <CategorySection shopName={params.shopName}/>
                        <div className="Cart-page">
                            <div className='bread-crumb'>
                                <ul>
                                    <li>
                                        <Link to={ `/${params.shopName}`} className="bread-crumb-link"> Home</Link>
                                    </li> |
                                    <li>
                                        Your Shopping Cart
                                    </li>
                                </ul>
                            </div>
                            <h6 className="cart-title">My Cart</h6>

                            <div className="table-section">
                                <Table className="table">
                                    <thead>
                                        <tr>
                                            <th className="th-product">Product </th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Remove</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className="Img-box">
                                                <img src={ShirtImage} alt="" className="img-fluid"/>
                                            </div>
                                           <p>UNCONDITIONAL Black cashmere mix mink collared single breasted coat - small </p>
                                        </td>
                                        <td> <p> &#8358; 4,000</p></td>
                                        <td> <p> &#8358; 4,000</p></td>
                                        <td> <p> &#8358; 4,000</p></td>
                                        <td> <p> &#8358; 4,000</p></td>
                                    </tr>
                                    </tbody>

                                </Table>
                            </div>
                        </div>


                        {/*more in this collection*/}
                        <div className="More-collection">
                            <hr/>
                            <h5>More in collection</h5>
                            <hr/>

                            <div className="More-products">
                                <div className="Shop-products">
                                    {loading ?
                                        (<Spinner />)
                                        : products && products.length > 0 ?
                                            (
                                                <>
                                                    <h6 className="small">{products.length} Product(s)</h6>
                                                    <Row>

                                                        {products.map((product) => (
                                                            <Col md={2} key={product.id}>
                                                                <ProductCard id={product.id} product={product.data} businessUrl={params.shopName} />
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </>
                                            ) :
                                            (<h6>No product available</h6>)
                                    }
                                </div>
                            </div>
                        </div>


                        <ShopFooter businessName={shopData.businessName}/>
                    </>
                )}
        </>

    )

}
export default Cart
