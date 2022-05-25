import {Button, Col, Container, Row} from "react-bootstrap";
import "../../css/shopHeader.css";
import React, {useEffect, useRef, useState} from "react";
import CartList from "./CartList";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import Spinner from "../../components/Spinner";

const ShopCart = ({businessUrl, domain}) => {

    const navigate = useNavigate()
    const params = useParams()
    const isMounted = useRef()

    const [disabled, setDisabled] = useState(false)
    const [carts, setCarts] = useState([])
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const [loading, setLoading] = useState(true)

    // checkout cart codes
    const onCheckout = () =>{
        setDisabled(true)
        try {
            toast.success("checked out")

            if(domain) {
                navigate(`/checkout/information`)
            }
             else{
                navigate(`/${params.shopName}/checkout/information`)
            }
        }
        catch (e) {
            console.log({e})
        }
    }

    // delete cart codes
    const onDelete = (cart) => {
        console.log("on delete")
        console.log(cart)

        try {
            let cartData = [...carts]

            const existingItem = cartData.find(cartItem => cartItem.uniqueId === cart.uniqueId);
            if (existingItem){
                cartData = cartData.filter(cartItem => cartItem.uniqueId !== cart.uniqueId);

                setCarts(cartData);

                let cartString = JSON.stringify(cartData)
                localStorage.setItem('cart', cartString)
                toast.success('item deleted')
            }
            else{
                toast.error('error deleting item')

            }

        }
        catch (e) {
            console.log({e})
        }
    }

    useEffect(() => {
        if(isMounted) {
            let localCart = localStorage.getItem("cart");
            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) setCarts(localCart)
            setLoading(false)
            //turn it into js

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
            <Container>
                <div className="Shopping-cart">
                    <h4 className="title">My Shopping Cart</h4>

                    {/*loading cart section*/}
                    {carts && carts.length > 0 ?
                        ( <>
                    <div className="Cart-section">
                        <Row className="justify-content-center">
                            {carts.map((cart) => (
                            <Col md={10} key={cart.id}>
                                <CartList businessUrl={businessUrl} id={cart.id} cart={cart} onDelete={() => {onDelete(cart)}} domain={domain} />
                            </Col>
                            ))}

                            <Col md={10}>
                                <Row>
                                    <Col md={7}></Col>
                                    <Col md={5}>
                                        <div className="Checkout-box">
                                            <h6 className="cart-count">
                                                {carts.length} { carts.length === 1 ? 'item' : 'Items'}
                                            </h6>
                                            <div className="cart-total">
                                                <h5>Subtotal</h5>
                                                <h5 className="total-price">&#8358;{(itemsPrice).toFixed(2).toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
                                            </div>
                                            <div className="cart-total-btn">
                                                <Button className="btn btn-md btn-primary"
                                                        disabled={disabled}
                                                        onClick={onCheckout}> Checkout</Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                        </> ) :
                        // empty cart section
                        (<h4> Empty Cart</h4>)}
                </div>
            </Container>
                )}
        </>
    )

}
export default ShopCart