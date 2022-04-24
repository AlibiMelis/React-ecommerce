import React, { Component } from "react";
import { findProductPrice, priceToString } from "../lib/utils";
import "./ProductCard.css";

class ProductCard extends Component {
  render() {
    const { product, currency } = this.props;
    const { name, gallery, brand, inStock } = product;

    return (
      <div className={"product-card" + (inStock ? " in-stock" : " out-of-stock")}>
        <div className="image">
          <img src={gallery[0]} alt={name} />
        </div>
        <div className="label">
          <div className="name">{`${brand} ${name}`}</div>
          <div>{priceToString(findProductPrice(product, currency))}</div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
