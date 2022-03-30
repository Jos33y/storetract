import {Button ,Table} from "react-bootstrap";
import ShirtImage from "../../assets/images/stripe-shirt.jpg"

const OrderSummary = () => {

    return (
        <>
          <div className="Order-summary">
              <div className="Mini-cart">
                  <Table className="table">
                      <tbody>
                      <tr>
                          <td className="cart-width">
                              <div className="mini-img-box">
                                  <span className="Quantity">1</span>
                                  <img src={ShirtImage} alt="" className="img-fluid"/>
                              </div>
                              <p className="title"> UNCONDITIONAL Black cashmere mix mink collared single breasted coat</p>
                          </td>
                          <td>
                              <p className="amount">&#8358;3000</p>
                          </td>
                      </tr>

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
                                  <li>Subtotal <span className="price money">&#8358;3000</span>  </li>
                                  <li>Shipping <span className="price"> Calculated at next steps</span></li>
                              </ul>
                          </td>
                      </tr>

                      {/*total section*/}
                      <tr className="Total-section">
                          <td colSpan={2}>
                              <p className="total">Total <span className="total-price">&#8358; 6000 </span></p>
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
