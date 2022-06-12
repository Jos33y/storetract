import {Col, Row} from "react-bootstrap";
import "../../css/shopHeader.css";
import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Spinner from "../../components/Spinner";

const ShopCart = ({businessUrl}) => {

    const navigate = useNavigate()
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
            navigate(`/checkout/information`)
        }
        catch (e) {
            console.log({e})
        }
    }
    const continueShopping = () => {
        navigate(`/products`)
    }

    // delete cart codes
    const onDelete = (cart) => {
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
        window.location.reload();
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
    }, [isMounted, businessUrl])

    return(
        <>
            {loading ?
                (<Spinner />)
                :
                (
                    <div className="store-shopping-cart">
                        <div className='bread-crumb'>
                            <ul>
                                <li>
                                    <Link to={ `/`} className="bread-crumb-link"> Home</Link>
                                </li> |

                                <li>
                                    <a href={ `/products`} className="bread-crumb-link"> Shop</a>
                                </li> |
                                <li> Shopping Cart </li>
                            </ul>
                        </div>
                        <Row>
                            <Col lg={8}>
                                <div className="cart-table">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th className="product-name">Product</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {/*loading cart section*/}
                                        {carts && carts.length > 0 ?
                                            ( <>
                                                {carts.map((cart) => (
                                                    <tr key={cart.id}>
                                                        <td className="products-cart">
                                                            <div className="cart-products">
                                                                <div className="cart-img">
                                                                    <img src={cart.imgUrls[0]} alt="" className="img-fluid"/>
                                                                </div>
                                                                <div className="text-section">
                                                                    <h5>
                                                                        <Link to={ `/products/${ cart.productCategory}/${cart.uniqueId}`} className="cart-name">  {cart.productName} </Link>
                                                                    </h5>
                                                                    <h6>&#8358;{cart.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td> <p className="quantity"> {cart.qty} </p>  </td>

                                                        <td>
                                                            <p className="total-price"> &#8358;{(cart.productPrice * cart.qty).toString()
                                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                                        </td>

                                                        <td><p className="delete" onClick={() => {onDelete(cart)}}> <i className="fas fa-times"></i></p></td>
                                                    </tr>
                                                ))}
                                            </> ) :
                                            // empty cart section
                                            (<tr>
                                                <td colSpan={4} className="text-center"> <h6>Cart is empty </h6> </td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                    <hr/>
                                    <div className="buttons-cart">
                                        <button className="btn btn-md btn-outline" onClick={continueShopping}> continue shopping </button>
                                        {carts.length > 0 && (   <button className="btn btn-md btn-secondary"> update cart </button>  )}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4}>
                                {carts.length > 0 && (
                                    <div className="cart-side-bar">
                                        <div className="discount-code">
                                            <h5> Discount Code</h5>
                                            <form action="#" method="post">
                                                <div className="form-group">
                                                    <input type="text" placeholder="Coupon code" className="form-control"/>
                                                    <button className="btn btn-md btn-secondary"> Apply</button>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="cart-summary">
                                            <h5>Cart total</h5>
                                            <div className="summary-text">
                                                <div className="title">
                                                    <h6>Subtotal</h6>
                                                    <h6>Total</h6>
                                                </div>

                                                <div className="prices">
                                                    <h6 className="light">&#8358;{(itemsPrice).toFixed(2).toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h6>

                                                    <h6 className="light">&#8358;{(itemsPrice).toFixed(2).toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h6>
                                                </div>
                                            </div>

                                            <div className="button-center">
                                                <button className="btn btn-md btn-secondary"
                                                        disabled={disabled}
                                                        onClick={onCheckout}> proceed to checkout</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </div>
                )}
        </>
    )

}
export default ShopCart