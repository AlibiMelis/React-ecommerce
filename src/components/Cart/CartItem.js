import React, { Component } from "react";
import { findProductPrice, priceToString } from "../../utils/price";
import AttributeSelect from "../AttributeSelect/AttributeSelect";
import "./CartItem.css";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 0,
    };
  }

  onPrevImage = () => {
    const { gallery } = this.props.item.product;
    const prevInd = this.state.image === 0 ? gallery.length - 1 : this.state.image - 1;
    this.setState({ image: prevInd });
  };
  onNextImage = () => {
    const { gallery } = this.props.item.product;
    const nextInd = this.state.image === gallery.length - 1 ? 0 : this.state.image + 1;
    this.setState({ image: nextInd });
  };

  onSetAttr = (key) => (value) => {
    const newValue = {};
    newValue[key] = value;
    this.props.onSetAttr(newValue);
  };

  render() {
    const { item, currency, inc, dec, onRemoveFromCart } = this.props;
    const { brand, name, gallery, attributes } = item.product;
    const price = findProductPrice(item.product, currency);
    return (
      <div className="cart-item">
        <div className="details">
          <div className="brand">{brand}</div>
          <div className="name">{name}</div>
          <div className="price-tag">{priceToString(price)}</div>
          <div>
            {attributes.map((attribute) => (
              <AttributeSelect
                className="attribute"
                attr={attribute}
                onChange={this.onSetAttr(attribute.id)}
                value={item.attributes[attribute.id]}
                key={attribute.id}
              />
            ))}
          </div>
        </div>
        <div className="cart-quantity-control">
          <button onClick={inc}>+</button>
          {item.qty}
          <button onClick={dec}>-</button>
        </div>
        <div className="cart-gallery">
          <img src={gallery[this.state.image]} alt={name} />
          <div className="cart-gallery-controls">
            <div className="btn-arrow left" onClick={this.onPrevImage}></div>
            <div className="btn-arrow right" onClick={this.onNextImage}></div>
          </div>
        </div>
        <div className="delete-item" onClick={onRemoveFromCart}>
          <div className="cross">&times;</div>
        </div>
      </div>
    );
  }
}

export default CartItem;
