import React, {useEffect, useRef, useState} from "react";
import "../pagesStyles.css";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import {
    collection,
    deleteDoc,
    doc, getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp, setDoc,
    updateDoc
} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import {Link, useParams} from "react-router-dom";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg";
import {v4 as uuidv4} from "uuid";
import Spinner from "../../../components/Spinner";

const DeliveryPage = ({storeUrl, userId}) => {

    const isMounted = useRef()
    const params = useParams()
    const deliverySlug = params.deliveryUrl;
    const [loading, setLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [deliveryList, setDeliveryList] = useState(null)
    const [deliveryData, setDeliveryData] = useState({
        location: '',
        amount: '',
        timeStamp: '',
    })

    const {location, amount} = deliveryData;

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsDisabled(true)
        const randId = uuidv4().slice(0,7)

        try {

            if(deliverySlug) {
                // console.log("updating")
                const deliveryDataCopy = {...deliveryData}
                const deliveryUpdateRef = doc(db, 'shops', storeUrl, 'deliveryInfo', deliverySlug)
                await updateDoc(deliveryUpdateRef, deliveryDataCopy)

                toast.success("delivery location updated")
                fetchDeliveryLocations().then()
            }
            else {

                let deliveryDataLocation = (deliveryData.location).replace(/[^a-zA-Z ]/g, "");
                let deliveryUnique = `${(deliveryDataLocation).replace(/,?\s+/g, '-')}-${randId}`
                let deliveryUniqueId = deliveryUnique.toLowerCase();

                // console.log({...formData})
                const deliveryDataCopy = {...deliveryData}
                deliveryDataCopy.deliveryUrl = deliveryUniqueId;
                deliveryDataCopy.timeStamp = serverTimestamp();
                const deliveryRef = doc(db, 'shops', storeUrl, 'deliveryInfo', deliveryUniqueId)
                await setDoc(deliveryRef, deliveryDataCopy).then(() => {
                    setDeliveryData((prevState)  => ({
                        ...prevState,
                        location: '',
                        amount: '',
                    } ))
                })

                toast.success("delivery location added")
                fetchDeliveryLocations().then()
            }
        } catch (error) {
            console.log({error})
            toast.error("Error in adding delivery location")
        }
        setIsDisabled(false)
    }

    const onChange = (e) => {
        setDeliveryData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        } ))
    }

    const getDeliveryList = async () =>{

        try {
            const deliveryRef = doc(db, 'shops', storeUrl, 'deliveryInfo', deliverySlug)
            const deliverySnap =  await getDoc(deliveryRef)

            if(deliverySnap.exists()){
                // console.log(categorySnap.data())
                setDeliveryData(deliverySnap.data())
            }
        }
        catch (error) {
            console.log({error})
        }
    }

    const fetchDeliveryLocations = async () => {
        try
        {
            // const auth = getAuth()
            const deliveryRef = collection(db, 'shops', storeUrl, 'deliveryInfo' )
            const q = query(deliveryRef, orderBy('timeStamp', 'desc'), limit(10))
            const querySnap = await getDocs(q)

            let deliveryList = [];

            querySnap.forEach((doc) => {
                //console.log(doc.data())
                return deliveryList.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setDeliveryList(deliveryList)
            // setLoading(false)
        }
        catch (error) {
            toast.error("could not fetch delivery locations")
            console.log({error})
        }
        setLoading(false)
    }

    const onDelete  = async(ID) => {
        console.log(ID)
        try {
            const deliveryRef = doc(db, 'shops', storeUrl, 'deliveryInfo', ID)
            await deleteDoc(deliveryRef)

            toast.success("deleted successfully")
            fetchDeliveryLocations().then()
        }
        catch (error) {
            console.log({error})
        }
    }

    useEffect(() => {

        if(isMounted) {
            if(params.deliveryUrl) {
                getDeliveryList().then()
            }

            fetchDeliveryLocations().then()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, userId])

    return (
        <>
            {loading ?
                (<Spinner />) :
                (

                    <section className="content-main">
                        <div className="content-header">
                            <h2 className="content-title"> Delivery Locations </h2>
                        </div>

                        <Card className="card">
                            <div className="card-body">
                                <Row>
                                    <Col md={5}>
                                        <>
                                            <Form onSubmit={onSubmit}>
                                                <div className="mb-4">
                                                    <label htmlFor="delivery_location" className="form-label"> Delivery Location</label>
                                                    <input type="text"
                                                           placeholder="Within Lagos"
                                                           className="form-control"
                                                           value={location}
                                                           onChange={onChange}
                                                           required={true}
                                                           maxLength={30}
                                                           id="location"/>
                                                </div>

                                                <div className="mb-4">
                                                    <label htmlFor="delivery_fee" className="form-label"> Delivery Fee</label>
                                                    <input
                                                        placeholder="2000"
                                                        type="number"
                                                        className="form-control"
                                                        value={amount}
                                                        onChange={onChange}
                                                        required={true}
                                                        maxLength={10}
                                                        id="amount"/>
                                                </div>

                                                <div className="d-grid">
                                                    <Button
                                                        type="submit"
                                                        disabled={isDisabled}
                                                        className="btn btn-md btn-primary">{deliverySlug ? ('Update Location') : ('Create Location')}  </Button>
                                                </div>
                                            </Form>
                                        </>
                                    </Col>
                                    <Col md={7}>
                                        <>
                                            {deliveryList && deliveryList.length > 0 ?
                                                (
                                                    <>
                                                        <Table className="table table-hover delivery-table">
                                                            <thead>
                                                            <tr>
                                                                <th>Location</th>
                                                                <th>Amount</th>
                                                                {/*<th>Slug</th>*/}
                                                                <th className="text-end"> Action </th>
                                                            </tr>
                                                            </thead>

                                                            <tbody>
                                                            {/*row one*/}
                                                            {deliveryList.map((delivery) =>(

                                                                <tr key={delivery.data.id}>
                                                                    <td className="bold">{delivery.data.location}</td>
                                                                    <td>&#8358;{delivery.data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                                                    {/*<td>/{category.categoryUrl}</td>*/}
                                                                    <td className="text-end">
                                                                        <div className="dropdown">
                                                                            <Link to="#" data-bs-toggle="dropdown" className="btn btn-outline-secondary">
                                                                                <i className="fas fa-ellipsis-v"></i>
                                                                            </Link>
                                                                            <div className="dropdown-menu">
                                                                                <a href={ `/dashboard/delivery-list/${delivery.id}`} className="dropdown-item"> Edit info</a>
                                                                                <Button type="button" onClick={() => {onDelete(delivery.id).then()}} className="dropdown-item text-danger"> Delete</Button>
                                                                            </div>
                                                                        </div> {/* dropdown ends*/}
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </Table>
                                                    </>
                                                ) :
                                                (
                                                    <div className="No-category">
                                                        <h5>No Delivery Locations Set</h5>
                                                        <img src={NotFoundImage} alt="" className="img-fluid"/>
                                                    </div>

                                                )}
                                        </>
                                    </Col>
                                </Row>
                            </div>
                        </Card>

                    </section>
                ) }

        </>
    )

}

export default DeliveryPage
