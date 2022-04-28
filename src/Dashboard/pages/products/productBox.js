import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

const ProductBox = ({product, id}) => {
  return (
      <>
          <Card className="card card-product-grid">
              <Link  to={`/${product.productCategory}/${id}`}  className="link img-wrap">
                  <img src={product.imgUrls[0]} alt="Product"/>
              </Link>
              <div className="info-wrap">
                  <span className="title text-truncate"> {product.productName}</span>
                  <div className="price mb-2">&#8358;  &#8358;{product.productPrice.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                  <Link data-bs-toggle="dropdown"  to={`/${product.productCategory}/${id}`} className="btn btn-sm btn-outline-secondary"><i
                      className="fas fa-edit"></i> Edit</Link>
                  <Link to="/dashboard/add-product"  className="btn btn-sm btn-outline-danger ms-2"> <i
                      className="fas fa-trash-alt"></i> Delete </Link>
              </div>
          </Card>
      </>
  )
}
export default ProductBox