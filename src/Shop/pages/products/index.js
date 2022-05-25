import {Col, Container, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {collection, getDocs, limit, query} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import {toast} from "react-toastify";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";

const ShopProducts = ({businessUrl, domain}) => {

    const params = useParams()
    const isMounted = useRef()
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)


    //Fetch Product
    const fetchProducts = async () => {
        try
        {
            const prodRef = collection(db, 'shops', `${businessUrl}`, 'products')
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

            fetchProducts()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.productUrl])
    return (
        <>
            <Container>
                <div className="Shop-products">
                    {/*--------------bread crumbs section-----------------------*/}
                    <div className='bread-crumb'>
                        <ul>
                            <li>
                                <Link to={ `/`} className="bread-crumb-link"> Home</Link>
                            </li> |
                            <li>
                                 Products
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
                                    <h5 className="h5">Products</h5>
                        <Row>
                            { products.map((product) => (
                                <Col md={ 3 } key={ product.id }>
                                    <ProductCard id={ product.id } product={ product.data }
                                                 businessUrl={ businessUrl } domain={domain}/>
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

export default ShopProducts