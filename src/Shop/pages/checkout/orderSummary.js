import React ,{useEffect ,useRef ,useState} from "react";
import {Button ,Table} from "react-bootstrap";
import {useParams} from "react-router-dom";

const OrderSummary = ({confirm}) => {

    const params = useParams()
    const [carts, setCarts] = useState([])
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const isMounted = useRef()


    useEffect(() => {
        if(isMounted) {
            let localCart = localStorage.getItem("cart");

            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) {
                setCarts(localCart)
            }
            // console.log(carts)

        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.productUrl])

    return (
        <>
            <div className="Order-summary">
                <div className="Mini-cart">
                    <Table className="table">
                        <tbody>

                        {carts.map((cart) => (
                            <tr >
                                <td key={cart.id} className="cart-width">
                                    <div className="mini-img-box">
                                        <img src={cart.imgUrls[0]} alt="" className="img-fluid"/>
                                    </div>
                                    <p className="title"> {cart.productName} <br/>
                                        <span>x {cart.qty} </span>
                                    </p>
                                </td>
                                <td>
                                    <p className="amount">&#8358;{(cart.productPrice * cart.qty).toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                </td>
                            </tr>
                        ))}

                        {/*coupon section*/}
                        { confirm ?
                            ("") :

                            <tr className="coupon">
                                <td>
                                    <input type="text" className="form-control" placeholder="Discount code"/>
                                </td>
                                <td>
                                    <Button className="btn btn-md btn-primary"> Apply</Button>
                                </td>
                            </tr>
                        }

                        {/*subtotal section*/}
                        <tr className="Sub-total">
                            <td colSpan={2}>
                                <ul>
                                    <li>Subtotal <span className="price money">&#8358;{(itemsPrice).toFixed(2).toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>  </li>
                                    <li>Shipping <span className="price"> Added at next steps</span></li>
                                </ul>
                            </td>
                        </tr>

                        {/*total section*/}
                        <tr className="Total-section">
                            <td colSpan={2}>
                                <p className="total">Total <span className="total-price">&#8358;{(itemsPrice).toFixed(2).toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}  </span></p>
                            </td>
                        </tr>
                        </tbody>
                    </Table>

                </div>

            </div>
        </>
    )

}
export default OrderSummary
