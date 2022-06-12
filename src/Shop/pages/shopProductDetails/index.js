import "../../css/shopHeader.css"
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import SimilarItem from "./similarItem";
import {collection, doc, getDoc, getDocs, limit, query} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import {toast} from "react-toastify";
import Spinner from "../../components/Spinner";


const ShopProductDetails = ({businessUrl}) => {
    const params = useParams()
    const isMounted = useRef()

    const [disabled, setDisabled] = useState(false)
    const [products, setProducts] = useState(null)
    const [product, setProduct] = useState(null)
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState("1")
    const [mainImage, setMainImage] = useState(null);

    const onChange = (e) => {
        setQuantity(e.target.value)

    }

    //add to cart function
    const addToCart = async (product) => {
        setDisabled(true)
        try{
            let cartData = [...cart]
            //look for item in cart array
            const existingItem = cartData.find(cartItem => cartItem.uniqueId === product.uniqueId);

            //if item already exists
            if (existingItem) {
                toast.error('item already added') //alert user
            } else { //if item doesn't exist, simply add it
                if(product.discountOffer) {
                    cartData.push({...product, productPrice: product.productDiscountPrice, qty: quantity})
                }
                else{
                    cartData.push({...product, qty: quantity})
                }


                if (toast.success('product added to cart')) {
                    window.location.reload();
                }
            }

            //update app state
            setCart(cartData)

            //make cart a string and store in local space
            let stringCart = JSON.stringify(cartData);
            localStorage.setItem("cart", stringCart)
        }
        catch (error) {
            console.log({error})
        }

        setDisabled(false)

    }
    //Fetch Product
    const fetchProducts = async () => {
        try
        {
            const prodRef = collection(db, 'shops', `${businessUrl}`, 'products')
            const q = query(prodRef, limit(4))
            const querySnap = await getDocs(q)
            let products = []
            querySnap.forEach((doc) => {
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

            const docRef = doc(db, "shops", `${businessUrl}`, 'products', params.productUrl)
            const docSnap = await getDoc(docRef );

            if (docSnap.exists()) {
                setProduct(docSnap.data())
                setMainImage(docSnap.data().imgUrls[0])
                setLoading(false)
            } else {
                console.log("No such document!");
                //setLoading(false)
            }
        }
        catch (error) {
            console.log({error})
        }
    }

    useEffect(() => {
        if(isMounted) {
            let localCart = localStorage.getItem("cart");
            fetchProducts().then()
            fetchProductDetails().then()

            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) setCart(localCart)

        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, businessUrl])

    return (
        <>
            {loading ?
                (<Spinner />)
                :
                (
                    <div className="Store-product-details">
                        {/*--------------bread crumbs section-----------------------*/}
                        <div className='bread-crumb'>
                            <ul>
                                <li>
                                    <Link to={ `/`} className="bread-crumb-link"> Home</Link>
                                </li> |
                                <li>
                                    <Link to={ `/products` } className="bread-crumb-link"> Products</Link>
                                </li> |
                                <li>
                                    {product.productName}
                                </li>
                            </ul>
                        </div>

                        {/*--------------product details section-----------------------*/}
                        <div className="product-details">
                            <Row>
                                <Col lg={7} className="col-sm-12">
                                    <div className="image-box">
                                        <Row>
                                            <Col md={9} className="col-sm-12">
                                                <div className="main">
                                                    <img src={`${mainImage}`} alt="" className="img-fluid" />
                                                </div>

                                            </Col>
                                            <Col md={3}  className="col-sm-12" >
                                                <div className="thumb">
                                                    <ul className="thumb-nails">
                                                        <li onClick={() => {setMainImage(product.imgUrls[0])}}>
                                                            <img src={product.imgUrls[0] ? product.imgUrls[0] : product.imgUrls[0] } alt="" className="img-fluid"/>
                                                        </li>

                                                        <li onClick={() => {setMainImage(product.imgUrls[1])}}>
                                                            <img src={product.imgUrls[1] ? product.imgUrls[1] : product.imgUrls[0] } alt="" className="img-fluid"/>
                                                        </li>

                                                        <li onClick={() => {setMainImage(product.imgUrls[2])}}>
                                                            <img src={product.imgUrls[2] ? product.imgUrls[2] : product.imgUrls[0] } alt="" className="img-fluid"/>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col lg={5} className="col-sm-12">
                                    <div className="product-details-text">
                                        <h5 className="product-title"> {product.productName} </h5>
                                        {product.discountOffer ? (
                                                <h6 className="product-price"> &#8358; {product.productDiscountPrice.toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    <span className="strike">
                                                    &#8358; {product.productPrice.toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                </span>
                                                </h6>

                                            )
                                            :
                                            (
                                                <h6 className="product-price"> &#8358; {product.productPrice.toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h6>
                                            )}

                                        <hr/>
                                        <div className="input">
                                            <h5>Quantity</h5>
                                            <input type="number"
                                                   className="form-control"
                                                   id="quantity"
                                                   onChange={onChange}
                                                   value={quantity}/>
                                        </div>
                                        <hr/>
                                        <div className="product-description">
                                            <h5 className="title">Description:</h5>
                                            <div className="description-text">
                                                <p>  {product.productDescription} </p>
                                            </div>
                                        </div>

                                        <div className="button-align">
                                            <button className="btn btn-md btn-secondary"
                                                    disabled={disabled}
                                                    onClick={() => addToCart(product)}> Add to Cart</button>
                                        </div>


                                    </div>

                                </Col>
                            </Row>

                        </div>

                        <SimilarItem products={products} loading={loading} businessUrl={businessUrl} />
                    </div>

                )}
        </>
    )

}
export default ShopProductDetails