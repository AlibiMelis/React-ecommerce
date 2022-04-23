import React, { Component } from "react";
import { findProductPrice, priceToString } from "../lib/utils";
import ProductAttribute from "../ProductDetails/ProductAttribute";
import "./MinicartItem.css";

class MinicartItem extends Component {
  onSetAttr = (attr, value) => this.props.onSetAttr(this.props.item, attr, value);

  render() {
    const { item, currency, inc, dec } = this.props;
    const attribute = item.product.attributes[0];
    const price = findProductPrice(item.product, currency);
    return (
      <div className="minicart-item">
        <div className="details">
          <div>{item.product.brand}</div>
          <div>{item.product.name}</div>
          <div className="price">{priceToString(price)}</div>
          <ProductAttribute
            condensed
            className="attributes"
            attr={attribute}
            onSetAttr={this.onSetAttr}
            selected={item.attributes ? item.attributes[attribute.id] : null}
            key={attribute.id}
          />
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
