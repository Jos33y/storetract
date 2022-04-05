import React from "react";
import {Link} from "react-router-dom";

const CartTable = ({cart, businessUrl, onDelete}) => {

    return (

        <>
            <td>
                <div className="Img-box">
                    <img src={cart.imgUrls[0]} alt="" className="img-fluid"/>
                </div>
               <Link to={ `/${businessUrl}/${ cart.productCategory}/${cart.uniqueId}`} className="link"> <p className="prod-name"> {cart.productName} </p> </Link>
            </td>
            <td> <p> &#8358;{cart.productPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p></td>
            <td className="input"> <p> {cart.qty}</p></td>
                {/*<input type="number" id="quantity" onChange={onUpdate}  className="form-control"value={quantity}/>*/}

            <td> <button className="btn btn-md btn-outline" onClick={onDelete} ><i className="far fa-trash-alt"></i></button></td>
            <td> <p> &#8358;{(cart.productPrice * cart.qty).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p></td>
        </>
    )

}

export default CartTable
