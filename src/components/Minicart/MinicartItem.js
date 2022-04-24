import React, { Component } from "react";
import { findProductPrice, priceToString } from "../../utils/price";
import AttributeSelect from "../AttributeSelect/AttributeSelect";
import "./MinicartItem.css";

class MinicartItem extends Component {
  onSetAttr = (key) => (value) => {
    const newValue = {};
    newValue[key] = value;
    this.props.onSetAttr(this.props.item.id, newValue);
  };

  render() {
    const { item, currency, inc, dec } = this.props;
    const price = findProductPrice(item.product, currency);
    return (
      <div className="minicart-item">
        <div className="details">
          <div>{item.product.brand}</div>
          <div>{item.product.name}</div>
          <div className="price">{priceToString(price)}</div>
          {item.product.attributes.map((attribute) => (
            <AttributeSelect
              condensed
              className="attributes"
              attr={attribute}
              onChange={this.onSetAttr(attribute.id)}
              value={item.attributes[attribute.id]}
              key={attribute.id}
            />
          ))}
        </div>
        <div className="quantity-control">
          <button onClick={inc}>+</button>
          {item.qty}
          <button onClick={dec}>-</button>
        </div>
        <div className="image">
          <img src={item.product.gallery[0]} alt={item.product.name} />
        </div>
      </div>
    );
  }
}

export default MinicartItem;
