import {Link ,useParams} from "react-router-dom";
import CategorySection from "./components/CategorySection";
import React ,{useEffect ,useRef ,useState} from "react";
import {collection ,doc ,getDoc ,getDocs ,limit ,query ,where} from "firebase/firestore";
import {db} from "../firebase.config";
import Spinner from "../components/Spinner";
import ShopFooter from "./components/ShopFooter";
import {Col ,Container ,Row} from "react-bootstrap";
import ShopHeader from "./components/ShopHeader";
import ShirtImage from "../assets/images/stripe-shirt.jpg";
import ProductCard from "./components/ProductCard";
import {toast} from "react-toastify";


const  ProductDetails = () => {
    const params = useParams()

    const [display, setDisplay] = useState(false);
    const [shopData, setShopData] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [products, setProducts] = useState(null)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const isMounted = useRef()



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

    //Fetch Product
    const fetchProducts = async () => {
        try
        {

            const prodRef = collection(db, 'shops', params.shopName, 'products')
            const q = query(prodRef, limit(5))
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
                                <button className="btn btn-md btn-primary btn-contact" onClick={() => {
                                    setDisplay((prevState) => !prevState)
                                }}> Contact Seller</button>

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
