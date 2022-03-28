import React from "react";

const CartTable = ({cart}) => {

    return (
        <>
            <td>
                <div className="Img-box">
                    <img src={cart.imgUrls[0]} alt="" className="img-fluid"/>
                </div>
                <p className="prod-name"> {cart.productName} </p>
            </td>
            <td> <p> &#8358;{cart.productPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p></td>
            <td className="input"> <p><input type="number" className="form-control" value="1"/></p></td>
            <td> <p><i className="far fa-trash-alt"></i></p></td>
            <td> <p> &#8358;{cart.productPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p></td>
        </>
    )

}

export default CartTable
