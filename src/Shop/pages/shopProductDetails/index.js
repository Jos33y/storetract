import "../../css/shopHeader.css"
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import SimilarItem from "./similarItem";
import {collection, doc, getDoc, getDocs, limit, query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import Spinner from "../../../components/Spinner";


const ShopProductDetails = ({businessUrl}) => {
    const params = useParams()
    const isMounted = useRef()

    const [disabled, setDisabled] = useState(false)
    const [products, setProducts] = useState(null)
    const [product, setProduct] = useState(null)
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState("1")


    const onChange = (e) => {
        setQuantity(e.target.value)
        // console.log(quantity)
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
                console.log(product.quantity)
                toast.error('item already added') //alert user
            } else { //if item doesn't exist, simply add it
                cartData.push({...product, qty: quantity})
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
        }



        // setDisabled(true)

    }
    //Fetch Product
    const fetchProducts = async () => {
        try
        {

            const prodRef = collection(db, 'shops', params.shopName, 'products')
            const q = query(prodRef, limit(4))
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
            let localCart = localStorage.getItem("cart");
            fetchProducts()
            fetchProductDetails()

            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) setCart(localCart)
            // console.log(localCart)


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
            <Container>

                <div className="Shop-product-details">
                    {/*--------------bread crumbs section-----------------------*/}
                    <div className='bread-crumb'>
                        <ul>
                            <li>
                                <Link to={ `/${businessUrl}`} className="bread-crumb-link"> Home</Link>
                            </li> |
                            <li>
                                <Link to={ `/${businessUrl}/products` } className="bread-crumb-link"> Products</Link>
                            </li> |
                            <li>
                                {product.productName}
                            </li>
                        </ul>
                    </div>
                    {/*--------------product details section-----------------------*/}
                    <div className="Product-details">
                        <Link to={ `/${businessUrl}/products` }  className="h5"> <i className="fas fa-chevron-left"></i>  Products</Link>
                        <Row>
                            <Col md={7}>
                                <div className="Image-box">
                                    <Row>
                                        <Col md={9} className="main">
                                            <img src={product.imgUrls[0]} alt="" className="img-fluid" />
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

                            <Col md={5}>
                                <div className="Product-details-text">
                                    <h5 className="Product-title"> {product.productName} </h5>
                                    <h6 className="Product-price"> &#8358; {product.productPrice.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h6>
                                    <p className="input">
                                        <h5>Quantity</h5>
                                        <input type="number"
                                               className="form-control"
                                               id="quantity"
                                               onChange={onChange}
                                               value={quantity}/></p>
                                    <p className="Product-description">
                                        <span className="title">Description: </span> <br/>
                                        {product.productDescription}
                                    </p>
                                    <div className="text-center">
                                        <button className="btn btn-md btn-primary btn-contact"
                                                disabled={disabled}
                                                onClick={() => addToCart(product)}> Add to Cart</button>
                                    </div>


                                </div>

                            </Col>
                        </Row>
                    </div>

                    <SimilarItem products={products} loading={loading} businessUrl={businessUrl} />
                </div>

            </Container>
                )}
        </>
    )

}
export default ShopProductDetails