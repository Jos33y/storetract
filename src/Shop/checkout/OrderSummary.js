import {Button ,Table} from "react-bootstrap";
import ShirtImage from "../../assets/images/stripe-shirt.jpg"
import React ,{useEffect ,useRef ,useState} from "react";
import {doc ,getDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
import {useParams} from "react-router-dom";
import CartTable from "../components/CartTable";

const OrderSummary = () => {

    const params = useParams()
    const [carts, setCarts] = useState([])
    const [loading, setLoading] = useState(true)

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
                      <tr key={cart.id}>
                          <td className="cart-width">
                              <div className="mini-img-box">
                                  <span className="Quantity">1</span>
                                  <img src={cart.imgUrls[0]} alt="" className="img-fluid"/>
                              </div>
                              <p className="title"> {cart.productName}</p>
                          </td>
                          <td>
                              <p className="amount">&#8358;{(cart.productPrice).toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                          </td>
                      </tr>
                          ))}

                      {/*coupon section*/}
                      <tr className="coupon">
                          <td>
                              <input type="text" className="form-control" placeholder="Discount code"/>
                          </td>
                          <td>
                              <Button className="btn btn-md btn-primary"> Apply</Button>
                          </td>
                      </tr>

                      {/*subtotal section*/}
                      <tr className="Sub-total">
                          <td colSpan={2}>
                              <ul>
                                  <li>Subtotal <span className="price money">dddd</span>  </li>
                                  <li>Shipping <span className="price"> Calculated at next steps</span></li>
                              </ul>
                          </td>
                      </tr>

                      {/*total section*/}
                      <tr className="Total-section">
                          <td colSpan={2}>
                              <p className="total">Total <span className="total-price">&#8358; 6000  </span></p>
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
