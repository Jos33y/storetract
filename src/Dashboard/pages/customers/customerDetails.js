import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Button ,Card ,Col ,Row} from "react-bootstrap";
import AvatarDefault from "../../../assets/images/avatardefault_92824.png"
import MapImg from "../../../assets/images/dashimages/map.jpg"
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";

const CustomerDetails = ({userId, storeUrl}) => {

    const params = useParams()
    const isMounted = useRef()
    const [customerData, setCustomerData] = useState([]);


    const getCustomer = async (customerID) => {
        try {
            const customerRef = doc(db, 'shops', storeUrl, 'customers', params.customerId)
            const customerSnap = await getDoc(customerRef)

            if(customerSnap.exists()) {
                setCustomerData(customerSnap.data());
            }
        }
        catch (error) {
            console.log({error})
        }
    }
    useEffect(() => {
        if(isMounted) {
            getCustomer().then()
        }

        return () => {
            isMounted.current = false;
        }
// eslint-disable-next-line
    },[isMounted, userId])

    return(
        <>
           <section className="content-main customer-details">
               <div className="content-header">
                   <Link to="/dashboard/customers" className="btn btn-light btn-analytics"><i
                       className="fas fa-arrow-left"></i> Go back </Link>
               </div>
               <Card className="card mb-4">
                   <div className="card-header bg-warning" style={{height: "150px"}}>

                   </div>
                   <div className="card-body">
                       <Row>
                           <Col xl={4} className="col-xl col-lg-6 col-md-4 flex-grow-0" style={{flexBasis: "230px"}} >
                               <div className="img-thumbnail shadow w-100 bg-white position-relative text-center" style={{height: "190px", width: "200px", marginTop: "-120px"}} >
                                   <img src={AvatarDefault} className="center-xy img-fluid" alt="brand"/>
                               </div>
                           </Col>
                           <Col xl={4} className="col-md col-lg-6 name-md">
                               <h3>{`${customerData.firstname} ${customerData.lastname}`}</h3>
                               <p>{`${customerData.deliveryAddress} ${customerData.city}, ${customerData.state}, ${customerData.country}`}</p>
                           </Col>
                           <Col xl={4} className="col-lg-12 text-md-end">
                               <select className="form-select w-auto d-inline-block">
                                   <option value="actions">Actions</option>
                                   <option value="delete customers">Delete customers</option>
                                   <option value="Analyze">analyze </option>
                                   <option value="something">Something</option>
                               </select>
                           </Col>
                       </Row>
                       <hr className="my-4" />
                           <Row className="g-4 details">
                               <Col sm={6} lg={4} xl={3}>
                                   <h6>Contacts</h6>
                                   <p>
                                       {`${customerData.firstname} ${customerData.lastname}`} <br/>
                                       {`${customerData.email}`} <br/>
                                       {`${customerData.phoneNumber}`}
                                   </p>
                               </Col>
                               <Col sm={6} lg={4} xl={3}>
                                   <h6>Address</h6>
                                   <p>
                                       Country: {`${customerData.country}`} <br/>
                                       State: {`${customerData.state}`} <br/>
                                       Address: {`${customerData.deliveryAddress} ${customerData.city}`}
                                   </p>
                               </Col>
                               <Col sm={6} xl={4} className="text-xl-end">
                                   <map className="mapbox position-relative d-inline-block">
                                       <img src={MapImg} alt="map" className="rounded" height={120}/>
                                       <span className="map-pin" style={{top: "50px", left: "100px"}}></span>
                                       <Button className="btn btn-sm btn-light position-absolute bottom-0 end-0 m-2"> Large </Button>
                                   </map>

                               </Col>
                           </Row>
                   </div>
               </Card>
           </section>
        </>
    )

}

export default CustomerDetails
