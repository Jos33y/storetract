import React, {useEffect, useRef, useState} from "react";
import "../pagesStyles.css"
import {Card ,Col ,Row} from "react-bootstrap";
import Statistics from "./statistics";
import LatestOrders from "./latestOrders";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";


const DashboardPage = ({storeData}) => {


    const isMounted = useRef()
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [totalSales, setTotalSales] = useState(null);



    // get number of orders
    const getOrders = async () => {
        try {
            const getOrdersRef = collection(db, 'shops', storeData.storeUrl, 'orders')
            const q = query(getOrdersRef)
            const querySnap = await getDocs(q)

            let orders = []
            querySnap.forEach((doc) => {
                // console.log(doc.data());
                return orders.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            setOrders(orders)
            const sales = orders.reduce((a, c) => a + c.data.orderTotal++, 0);
            setTotalSales(sales)

        }
        catch (error) {
            console.log({error})
            toast.error("currently can't get your orders")
        }

    }


    // get number of orders
    const getProducts = async () => {
        try {
            const getProdsRef = collection(db, 'shops', storeData.storeUrl, 'products')
            const q = query(getProdsRef)
            const querySnap = await getDocs(q)

            let products = []
            querySnap.forEach((doc) => {
                // console.log(doc.data());
                return products.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            setProducts(products)
        }
        catch (error) {
            console.log({error})
            toast.error("currently can't get Products ")
        }

    }

    useEffect(() => {

        if(isMounted) {
            getOrders().then()
            getProducts().then()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
      <>
         <section className="content-main">
             <div className="content-header">
                 <h2 className="content-title"> Dashboard </h2>
                 <div>
                     <a target="_blank"  rel="noopener noreferrer" href={`/${storeData.storeUrl}`} className="btn btn-md btn-primary"><i
                         className="fas fa-external-link-alt"></i> View Store </a>
                 </div>
             </div>

             {/*dashboard cards*/}
             <Row>
                 {/*column one*/}
                 <Col lg={4}>
                     <Card className="card card-body mb-4">
                         <article className="icontext">
                             <span className="icon icon-sm rounded-circle bg-primary-light">
                                 <i className="fas fa-money-bill-alt text-primary"></i>
                             </span>
                             <div className="text">
                                 <h6 className="mb-1">Total Sales</h6>
                                 <span>&#8358; {totalSales ?  totalSales.toString()
                                     .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}</span>
                             </div>
                         </article>
                     </Card>
                 </Col>
                 {/*column two*/}
                 <Col lg={4}>
                     <Card className="card-body mb-4">
                         <article className="icontext">
                             <span className="icon icon-sm rounded-circle bg-success-light">
                                <i className="fas fa-truck text-success"></i>
                             </span>
                             <div className="text">
                                 <h6 className="mb-1">Total Orders</h6>
                                 <span>{orders && orders.length > 0 ? (`${orders.length.toString()
                                     .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`) : ('0')} </span>
                             </div>
                         </article>
                     </Card>
                 </Col>

                 {/*column three*/}
                 <Col lg={4}>
                     <Card className="card-body mb-4">
                         <article className="icontext">
                             <span className="icon icon-sm rounded-circle bg-warning-light">
                                <i className="fas fa-shopping-basket text-warning"></i>
                             </span>
                             <div className="text">
                                 <h6 className="mb-1">Total Products</h6>
                                 <span>{products && products.length > 0 ? (`${products.length.toString()
                                     .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`) : ('0')} </span>
                             </div>
                         </article>
                     </Card>
                 </Col>
             </Row>

             {/*dashboard statistics and reward points*/}
             <Statistics />
             {/*latest orders section*/}
             <LatestOrders storeUrl={storeData.storeUrl}/>
         </section>
      </>
  )
}

export default DashboardPage
