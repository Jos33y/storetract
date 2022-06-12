import {Col, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {collection, doc, getDoc, getDocs, orderBy, query, where} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import {toast} from "react-toastify";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";

const ShopProducts = ({businessUrl}) => {

    const params = useParams()
    const isMounted = useRef()
    const [products, setProducts] = useState(null)
    const [categories, setCategories] = useState(null)
    const [loading, setLoading] = useState(true)
    const [display, setDisplay] = useState(true);
    // const [checkCat, setCheckCat]= useState(false)
    const [categoryName, setCategoryName] = useState('')



    const checkCategory = async () => {
        if(params.categoryUrl){
            await fetchCategory()
        }
    }

    //Fetch Product
    const fetchProducts = async () => {
        try
        {
            const prodRef = collection(db, 'shops', `${businessUrl}`, 'products')
            let q;
            if(params.categoryUrl) {
                 q = query(prodRef, where("productCategory", "==", params.categoryUrl), orderBy('timeStamp', "desc"))
            }
            else {
                 q = query(prodRef, orderBy('timeStamp', "desc"))
            }

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
        setLoading(false)
    }

    const fetchCategories = async () => {
        try
        {
            const catRef = collection(db, 'shops', `${businessUrl}`, 'categories' )
            const q = query(catRef, orderBy('timeStamp', 'asc'))
            const querySnap = await getDocs(q)
            let categories = [];
            querySnap.forEach((doc) => {
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
        setLoading(false)
    }
    //Fetch category name
    const fetchCategory = async () => {
        try
        {
            const docRef = doc(db, "shops", `${businessUrl}`, 'categories', params.categoryUrl )
            const docSnap = await getDoc(docRef );

            if (docSnap.exists()) {
                setCategoryName(docSnap.data().title)
            } else {
                console.log("No such document!");
            }
        }
        catch (error) {
            console.log({error})
        }
    }



    useEffect(() => {
        if(isMounted) {

            checkCategory().then()
            fetchCategories().then()
            fetchProducts().then()

        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, businessUrl])
    return (
        <>
            <div className="Store-products">
                <div className='bread-crumb'>
                    <ul>
                        <li>
                            <Link to={ `/`} className="bread-crumb-link"> Home</Link>
                        </li> |
                        {params.categoryUrl ? (
                            <li> <a href={ `/products`} className="bread-crumb-link"> Products</a> </li>
                            ) : (
                            <li> Products </li>
                        )}
                        {params.categoryUrl && ( <> | <li> {`${categoryName}`} </li> </> )}
                    </ul>
                </div>

                <div className="shop-section container-lg">
                    <Row>
                        <Col md={3}>
                            <div className="category-section">
                                <div className="category-header"
                                     onClick={() => {
                                    setDisplay((prevState) => !prevState)
                                }}>
                                    <h5>Categories </h5>
                                    <h5><i className="fas fa-chevron-down"></i></h5>
                                </div>
                                {display && (
                                     loading ? (<Spinner/>) : categories && categories.length > 0 ? (
                                         <ul className="category-list">
                                             { categories.map((category) => (
                                                 <>
                                                     <li  key={ category.id }>
                                                         <a href={`/products/${ category.data.categoryUrl }`} className="category-link"> {category.data.title}  </a>
                                                     </li>
                                                     <hr/>
                                                 </>
                                             )) }
                                         </ul>
                                         ) : (<p>No categories available</p> )
                                )}
                            </div>
                        </Col>

                        <Col md={9}>
                            <div className="product-section">
                                <div className="product-section-header">
                                    <h5> {params.categoryUrl ? (`${categoryName}`) : ('Products')}  <span className="number"> ({products ? products.length : '0'}) </span>  </h5>
                                </div>

                                <div className="product-list">
                                    { loading ? (<Spinner/>) : products && products.length > 0 ? (
                                        <Row>
                                            { products.map((product) => (
                                                <Col lg={4} className="col-md-6 col-6" key={ product.id }>
                                                    <ProductCard id={ product.id }
                                                                 product={ product.data }
                                                                 businessUrl={ businessUrl }/>
                                                </Col> )) }
                                        </Row> ) :
                                        (<h6>No product available</h6>)
                                    }
                                </div>

                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )

}

export default ShopProducts