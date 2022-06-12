import { Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";

const ProductBox = ({product, id, storeUrl}) => {

    const onDelete = async () => {
        try {
            const prodRef = doc(db, 'shops', storeUrl, 'products', id)
            await deleteDoc(prodRef)

            toast.success("Product deleted successfully")

        }
        catch (error) {
            console.log({error})
        }
    }
  return (
      <>
          <Card className="card card-product-grid">
              <Link  to={`/dashboard/edit-product/${id}`} className="link img-wrap">
                  <img src={product.imgUrls[0]} alt="Product"/>
              </Link>
              <div className="info-wrap">
                  <span className="title text-truncate"> {product.productName}</span>
                  {product.discountOffer ? (
                      <div className="price mb-2">&#8358;{product.productDiscountPrice.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          <span className="strike">
                              &#8358;{product.productPrice.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </span> </div>
                  ) : (
                      <div className="price mb-2">&#8358;{product.productPrice.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                  )}

                  <Link  to={`/dashboard/edit-product/${id}`} className="btn btn-sm btn-outline-secondary"><i
                      className="fas fa-edit"></i> Edit</Link>
                  <button onClick={onDelete}  type="button" className="btn btn-sm btn-outline-danger ms-2"> <i
                      className="fas fa-trash-alt"></i> Delete </button>
              </div>
          </Card>
      </>
  )
}
export default ProductBox