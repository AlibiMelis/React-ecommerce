import React, { Component } from "react";
import { findProductPrice, priceToString } from "../lib/utils";
import "./MinicartItem.css";

class MinicartItem extends Component {
  render() {
    const { item, currency, inc, dec } = this.props;
    const price = findProductPrice(item.product, currency);
    return (
      <div className="minicart-item">
        <div className="details">
          <div>{item.product.brand}</div>
          <div>{item.product.name}</div>
          <div className="price">{priceToString(price)}</div>
          
        </div>
        <div className="quantity-control">
          <button onClick={inc}>+</button>
          {item.qty}
          <button onClick={dec}>-</button>
        </div>
        <div>
          <img src={item.product.gallery[0]} alt={item.product.name} />
        </div>
      </div>
    );
  }
}

export default MinicartItem;
