import React, {useEffect, useRef, useState} from "react";
import "../pagesStyles.css"
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";
import Spinner from "../../../components/Spinner";
import {toast} from "react-toastify";

const OrderDetailsPage = ({userId, storeUrl}) => {

    const params = useParams()
    const isMounted = useRef()
    const [orderData, setOrderData] = useState([]);
    const [orderStatus, setOrderStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingTwo, setLoadingTwo] = useState(false);
    const [isDisabled, setIsDisbaled] = useState(false)
    const [customerData, setCustomerData] = useState([]);
    const [shippingData, setShippingData] = useState(null);

    const getOrderDetails = async () => {
      setLoading(true)

      try {
          const orderRef = doc(db, 'shops', storeUrl, 'orders', params.orderId)
          const orderSnap = await getDoc(orderRef)

          if(orderSnap.exists()) {
              setOrderData(orderSnap.data());
              setOrderStatus(orderSnap.data().orderStatus)
              getCustomer(orderSnap.data().customerId).then()
              getShippingDetails(orderSnap.data().shippingMethod).then()
          }
      }
      catch (error) {
          console.log({error})
      }
      setLoading(false)
    }

    const getCustomer = async (customerID) => {
        try {
            const customerRef = doc(db, 'shops', storeUrl, 'customers', customerID)
            const customerSnap = await getDoc(customerRef)

            if(customerSnap.exists()) {
                setCustomerData(customerSnap.data());
            }
        }
        catch (error) {
            console.log({error})
        }
    }

    const getShippingDetails = async (shippingID) => {
        try {
            const shippingRef = doc(db, 'shops', storeUrl, 'deliveryInfo', shippingID)
            const shippingSnap = await getDoc(shippingRef)

            if(shippingSnap.exists()) {
                setShippingData(shippingSnap.data());
            }
        }
        catch (error) {
            console.log({error})
        }
    }
    const handleChanges = async (e) => {
      setLoadingTwo(true)
        setIsDisbaled(true)
      e.preventDefault()

        try {
            const updateOrder = {
                orderStatus: `${orderStatus}`,
            }
            const orderDataRef = doc(db, 'shops',`${storeUrl}`, 'orders' , `${orderData.orderId}`)
            await updateDoc(orderDataRef, updateOrder).then()
            toast.success("order status updated")
        }
        catch (error) {
            console.log({error})
        }
        setLoadingTwo(false)
        setIsDisbaled(false)
    }

    const onChange = (e) => {
       setOrderStatus(e.target.value)
    }

    useEffect(() => {
        if(isMounted) {
           getOrderDetails().then()
        }

        return () => {
            isMounted.current = false;
        }
// eslint-disable-next-line
    },[isMounted, userId])

    return (
        <>
            {loading ?
                (<Spinner />) :
                (
           <section className="content-main">
               <div className="content-header">
                   <h2 className="content-title">Order details</h2>
               </div>
               <Card className="order-details-page">
                   <header className="card-header">
                       <Row className="align-items-center">
                           <Col lg={6} md={6}>
                               <i className="fas fa-calendar-day"></i>
                               <span className="bold"> {`${orderData.timeStamp.toDate().toLocaleString()}`}</span> <br/>
                               {/*<span className="bold"> Wed, Mar 13, 2022, 4:32pm</span> <br/>*/}
                               <small className="text-muted">Order ID: {`${orderData.orderId}`}</small>
                           </Col>

                           {orderData.deliveryStatus === 'Payment Successful'  && (

                           <Form onSubmit={handleChanges} className="form">
                               <Col lg={6} md={6} className="ms-auto text-md-end">
                                   <select style={{maxWidth: "200px"}}
                                           name="orderStatus"
                                           id="orderStatus"
                                           value={orderStatus}
                                           onChange={onChange}
                                           className="form-select d-inline-block">
                                       <option selected disabled value="Success">Change Status</option>
                                       <option value="Received">Received</option>
                                       <option value="Shipped">Shipped</option>
                                       <option value="Delivered">Delivered</option>
                                   </select>
                                   <Button type="submit" disabled={isDisabled} className="btn btn-md btn-secondary ms-2">
                                       {loadingTwo ? (<> <span className="spinner-border spinner-border-sm" role="status"
                                                            aria-hidden="true"></span>&nbsp; </> ) : ('')
                                       }
                                       Save </Button>
                                   {/*<Button  className="btn btn-secondary ms-2"> <i className="fas fa-print"></i></Button>*/}
                               </Col>
                           </Form>
                           )}
                       </Row>
                   </header>
                   <div className="card-body">
                       <Row className="mb-5 order-info-wrap">
                           <Col md={4}>
                               <article className="icontext align-items-start">
                                   <span className="icon icon-sm rounded-circle bg-primary-light">
                                        <i className="fas fa-user text-primary"></i>
                                   </span>
                                   <div className="text">
                                       <h6 className="mb-1">Customer</h6>
                                       <p className="mb-1">
                                           {`${orderData.firstname} ${orderData.lastname}`} <br/>
                                           {`${orderData.email}`}<br/>
                                           {`${customerData.phoneNumber}`}
                                       </p>
                                       {/*<Link to={`/dashboard/customers/${orderData.customerId}`}> View Profile</Link>*/}
                                   </div>
                               </article>
                           </Col>
                           <Col md={4}>
                               <article className="icontext align-items-start">
                                   <span className="icon icon-sm rounded-circle bg-primary-light">
                                        <i className="fas fa-truck-moving text-primary"></i>
                                   </span>
                                   <div className="text">
                                       <h6 className="mb-1">Order info</h6>
                                       <p className="mb-1">
                                           Shipping: {`${shippingData ? shippingData.location : ''}`} <br/>
                                           Pay method: {`${orderData.paymentMethod}`} <br/>
                                           Status: {`${orderStatus}`}
                                       </p>

                                   </div>

                               </article>

                           </Col>

                           <Col md={4}>
                               <article className="icontext align-items-start">
                                   <span className="icon icon-sm rounded-circle bg-primary-light">
                                        <i className="fas fa-map-marker text-primary"></i>
                                   </span>
                                   <div className="text">
                                       <h6 className="mb-1">Deliver to</h6>
                                       <p className="mb-1">
                                          {`${customerData.deliveryAddress}`} <br/>
                                           City: {`${customerData.city}`}<br/>
                                           State: {`${customerData.state}`}<br/>
                                           Country: {`${customerData.country}`}
                                       </p>
                                   </div>
                               </article>
                           </Col>
                       </Row>

                       <Row>
                           <Col lg={12}>
                               <div className="table-responsive max-table">
                                   <Table className="table-border table-hover table-lg">
                                       <thead>
                                        <tr>
                                            <th width="60%">Product</th>
                                            <th width="20%">Unit Price</th>
                                            <th width="10%">Quantity</th>
                                            <th width="10%" className="text-end">Total</th>
                                        </tr>
                                       </thead>
                                       <tbody>
                                       {/*row one*/}
                                       {orderData.productOrdered.map((order) => (
                                       <tr key={order.id}>
                                           <td>
                                               <div className="itemside">
                                                   <div className="left">
                                                       <img src={order.imgUrls[0]} alt="item" width={40} height={40} style={{objectFit:"contain"}} className="img-xs"/>
                                                   </div>
                                                   <div className="info">{order.productName} </div>
                                               </div>
                                           </td>
                                           <td>&#8358;{order.productPrice.toString()
                                               .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                           <td> {order.qty} </td>
                                           <td className="text-end"> &#8358;{(order.qty * order.productPrice).toString()
                                               .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                       </tr>
                                       ))}
                                       <tr>
                                           <td colSpan={4}>
                                               <article className="float-end">
                                                   <dl className="dlist">
                                                       <dt>Subtotal: </dt> <dd>&#8358;{orderData.orderSubTotal.toString()
                                                       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                                                   </dl>
                                                   <dl className="dlist">
                                                       <dt>Shipping cost: </dt> <dd> &#8358;{(orderData.shippingPrice ? Number(orderData.shippingPrice) : (0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                                                   </dl>

                                                   <dl className="dlist">
                                                       <dt>Grand total: </dt> <dd> &#8358;{orderData.orderTotal.toString()
                                                       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                                                   </dl>
                                                   <dl className="dlist">
                                                       <dt className="text-muted">Payment Status </dt>
                                                       <dd>
                                                           <span className={`badge rounded-pill ${ orderData.deliveryStatus === "Payment Successful" ? ('alert-success') : 'alert-danger'}`}>{`${orderData.deliveryStatus}`}<br/>

                                                           </span> </dd>
                                                   </dl>
                                               </article>
                                           </td>
                                       </tr>
                                       </tbody>
                                   </Table>
                               </div>

                               <div className="mini-table">
                                   <table className="table table-hover">


                                       <tbody>
                                       {orderData.productOrdered.map((order) => (
                                       <tr>
                                           <td>
                                               <div className="itemside">
                                                   <div className="left">
                                                       <img src={order.imgUrls[0]} alt="item" width={40} height={40} style={{objectFit:"contain"}} className="img-xs"/>
                                                   </div>
                                                   <div className="info"> {order.productName} </div>
                                               </div>
                                               <div className="qty">
                                                   <h6>  {order.qty} X &#8358;{order.productPrice.toString()
                                                       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h6>
                                               </div>
                                           </td>
                                           <td> <p className="total-price"> &#8358;{(order.qty * order.productPrice).toString()
                                               .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </p></td>
                                       </tr>
                                       ))}
                                       <tr>
                                           <td colSpan={2}>
                                               <article className="float-end">
                                                   <dl className="dlist">
                                                       <dt>Subtotal: </dt> <dd>&#8358;{orderData.orderTotal.toString()
                                                       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                                                   </dl>
                                                   <dl className="dlist">
                                                       <dt>Shipping cost: </dt> <dd> &#8358; 0.00</dd>
                                                   </dl>

                                                   <dl className="dlist">
                                                       <dt>Grand total: </dt> <dd> &#8358;{orderData.orderTotal.toString()
                                                       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
                                                   </dl>
                                                   <dl className="dlist">
                                                       <dt className="text-muted">Payment Status </dt>
                                                       <dd>
                                                           <span className={`badge rounded-pill ${ orderData.deliveryStatus === "Payment Successful" ? ('alert-success') : 'alert-danger'}`}>{`${orderData.deliveryStatus}`}<br/>

                                                           </span> </dd>
                                                   </dl>
                                               </article>
                                           </td>
                                       </tr>
                                       </tbody>
                                   </table>
                               </div>
                           </Col>
                       </Row>
                   </div>
               </Card>
           </section>
                ) }
        </>
    )

}
export default OrderDetailsPage
