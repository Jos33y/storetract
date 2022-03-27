import {Link ,useParams} from "react-router-dom";
import CategorySection from "./components/CategorySection";
import React ,{useEffect ,useRef ,useState} from "react";
import {collection ,doc ,getDoc ,getDocs ,limit ,query ,serverTimestamp ,setDoc ,where} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../components/Spinner";
import ShopFooter from "./components/ShopFooter";
import {Col ,Container ,Row} from "react-bootstrap";
import ShopHeader from "./components/ShopHeader";
import ProductCard from "./components/ProductCard";
import {toast} from "react-toastify";
// import publicIp from 'public-ip';
import ShopNavHeader from "./components/ShopNavHeader";


const  ProductDetails = () => {
    const params = useParams()

    const [display, setDisplay] = useState(false);
    const [disabled, setDisabled] = useState(false)
    const [shopUpgraded, setShopUpgraded] = useState(true);
    const [shopData, setShopData] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [products, setProducts] = useState(null)
    const [product, setProduct] = useState(null)
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)

    const isMounted = useRef()
    let localCart = localStorage.getItem("cart");


    //add to cart function
   const addToCart = async (product) => {
       setDisabled(true)

       try{
            let cartData = [...cart]

           //assuming we have an ID field in our item

           //console.log(cartData)

           //look for item in cart array
           const existingItem = cartData.find(cartItem => cartItem.uniqueId === product.uniqueId);

           //if item already exists
           if (existingItem) {
               toast.error('item already added') //alert user
           } else { //if item doesn't exist, simply add it
               cartData.push(product)
               toast.success('product added to cart')
           }

           //update app state
           setCart(cartData)

           //make cart a string and store in local space
           let stringCart = JSON.stringify(cartData);
           localStorage.setItem("cart", stringCart)
           setDisabled(false)

       }
       catch (error) {
           console.log({error})
           setDisabled(false)
           setShopUpgraded(true)
       }



       // setDisabled(true)

    }

    //Fetch Category
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

    // //Fetch Carts
    // const fetchCarts = async () => {
    //     try
    //     {
    //         const ipAddress = await (publicIp.v4({
    //             fallbackUrls: [
    //                 'https://ifconfig.co/ip'
    //             ]
    //         }));
    //         const cartRef = collection(db, 'shops', params.shopName, 'carts')
    //         const q = query(cartRef, where("ipAddress", "==", ipAddress))
    //         const querySnap = await getDocs(q)
    //         let carts = []
    //         querySnap.forEach((doc) => {
    //             console.log(doc.data());
    //             return carts.push({
    //                 id: doc.id,
    //                 data: doc.data(),
    //             })
    //         })
    //         setCarts(carts)
    //         setLoading(false)
    //     }
    //     catch (error) {
    //         console.log({error})
    //         toast.error("Unable to retrieve carts")
    //
    //     }
    // }
    //

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



        }
        catch (error) {
            console.log({error})
            toast.error("Unable to retrieve products")

        }
    }


//Fetch Product Details
    const fetchProductDetails = async () => {
        try
        {
            const docRef = doc(db, "shops", params.shopName, 'products', params.productUrl)
            const docSnap = await getDoc(docRef );

            if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data());
                setProduct(docSnap.data())
                setLoading(false)
            } else {
                console.log("No such document!");
                //console.log(params.productUrl)
                //setLoading(false)
            }
        }
        catch (error) {
            console.log({error})
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
            fetchCategory()
            fetchProducts()
            fetchProductDetails()

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
            <Container className="Category-page">
                <div className='bread-crumb'>
                    <ul>
                        <li>
                            <Link to={ `/${params.shopName}`} className="bread-crumb-link"> Home</Link>
                        </li> |
                        <li>
                            <Link to={ `/${params.shopName}/${ params.categoryUrl}` }className="bread-crumb-link"> {categoryName.title}</Link>
                        </li> |
                        <li>
                            {product.productName}
                        </li>
                    </ul>
                </div>

                {/*product details section*/}
                <div className="Quick-view">
                    <Row>
                        <Col md={6}>
                            <div className="Image-box">
                                <Row>
                                    <Col md={9} className="main">
                                        <img src={product.imgUrls[0]} alt="" className="img-fluid"/>
                                    </Col>
                                    <Col md={3} className="thumb">
                                        <ul className="Thumb-nails">
                                            <li>  <img src={product.imgUrls[0] ? product.imgUrls[0] : product.imgUrls[0] } alt="" className="img-fluid"/></li>
                                            <li>  <img src={product.imgUrls[1] ? product.imgUrls[1] : product.imgUrls[0] } alt="" className="img-fluid"/></li>
                                            <li>  <img src={product.imgUrls[2] ? product.imgUrls[2] : product.imgUrls[0] } alt="" className="img-fluid"/></li>
                                        </ul>
                                    </Col>
                                </Row>

                            </div>

                        </Col>

                        <Col md={6}>
                            <div className="Quick-view-text">
                                <h5>{product.productName} </h5>
                                <h6> &#8358;{product.productPrice.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    {product.offer &&
                                    (<span className="discount-price">  &#8358; {product.productDiscountPrice.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>)}
                                </h6>
                                <p>
                                    {product.productDescription}
                                </p>
                                {shopUpgraded ? (<button disabled={disabled} className="btn btn-md btn-primary btn-contact" onClick={() => addToCart(product)}> Add to Cart</button>)
                                    :
                                    (<button className="btn btn-md btn-primary btn-contact" onClick={() => {
                                        setDisplay((prevState) => !prevState)
                                    }}> Contact Seller</button>)}



                                {display ? (
                                    <div className="contact-buttons">
                                        <ul>
                                            <li>
                                                <a href="https://" className="btn btn-md btn-whatsapp"> WhatsApp <i className="fab fa-whatsapp"></i> </a>
                                            </li>

                                            <li>
                                                <a href="https://" className="btn btn-md btn-instagram"> Instagram <i className="fab fa-instagram"></i> </a>
                                            </li>

                                            <li>
                                                <a href="https://" className="btn btn-md btn-twitter"> Twitter <i className="fab fa-twitter"></i> </a>
                                            </li>

                                            <li>
                                                <a href="https://" className="btn btn-md btn-facebook"> Facebook <i className="fab fa-facebook"></i> </a>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (<p className="margin-break"></p> )}


                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>

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

export default ProductDetails
