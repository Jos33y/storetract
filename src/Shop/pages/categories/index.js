import {Col, Container, Row} from "react-bootstrap";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "../../../firebase.config";
import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import Spinner from "../../../components/Spinner";
import ProductCard from "../../components/ProductCard";

const ShopCategories = ({businessUrl}) => {

    const params = useParams()
    const isMounted = useRef()
    const [products, setProducts] = useState('')
    const [loading, setLoading] = useState(true)
    const [categoryName, setCategoryName] = useState('')

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
            fetchCategory().then()
            fetchProducts().then()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.shopName])



    return (
        <>
            <Container>
                <div className="Shop-products">
                    {/*--------------bread crumbs section-----------------------*/}
                    <div className='bread-crumb'>
                        <ul>
                            <li>
                                <Link to={ `/${businessUrl}`} className="bread-crumb-link"> Home</Link>
                            </li> |
                            <li>
                                {categoryName.title}
                            </li>
                        </ul>
                    </div>

                    {/*--------------list of products section-----------------------*/}
                    <div className="Shop-products-list">
                        { loading ?
                            (<Spinner/>)
                            : products && products.length > 0 ?
                                (
                                    <>
                                        <h5 className="h5">{categoryName.title}</h5>
                                        <Row>
                                            { products.map((product) => (
                                                <Col md={ 3 } key={ product.id }>
                                                    <ProductCard id={ product.id } product={ product.data }
                                                                 businessUrl={ businessUrl }/>
                                                </Col>
                                            )) }
                                        </Row>
                                    </>
                                ) :
                                (<h6>No product available</h6>)
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ShopCategories;