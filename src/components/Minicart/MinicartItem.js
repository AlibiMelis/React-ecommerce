import React, { Component } from "react";
import { findProductPrice, priceToString } from "../../utils/price";
import AttributeSelect from "../AttributeSelect/AttributeSelect";
import "./MinicartItem.css";

class MinicartItem extends Component {
  onSetAttr = (attr, value) => {
    const newAttr = {};
    newAttr[attr] = value;
    this.props.onSetAttr(newAttr);
  };

  render() {
    const { item, currency, onInc, onDec } = this.props;
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
              value={item.attributes[attribute.id]}
              onChange={(value) => this.onSetAttr(attribute.id, value)}
              key={attribute.id}
            />
          ))}
        </div>
        <div className="quantity-control">
          <button onClick={onInc}>+</button>
          {item.qty}
          <button onClick={onDec}>-</button>
        </div>
        <div className="image">
          <img src={item.product.gallery[0]} alt={item.product.name} />
        </div>
      </div>
    );
  }
}

export default MinicartItem;
