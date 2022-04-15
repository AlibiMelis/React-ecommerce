import React, { Component } from "react";
import { priceToString } from "../lib/utils";
import ProductAttribute from "../ProductDetails/ProductAttribute";
import "./CartItem.css";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 0,
    };
  }

  onPrevImage = () => {
    const { product } = this.props.item;
    if (this.state.image === 0) {
      return this.setState({
        image: product.gallery.length - 1,
      });
    }
    this.setState({ image: this.state.image - 1 });
  };
  onNextImage = () => {
    const { product } = this.props.item;
    if (this.state.image === product.gallery.length - 1) {
      return this.setState({
        image: 0,
      });
    }
    this.setState({ image: this.state.image + 1 });
  };
  onSetAttr = (attr, value) => this.props.onSetAttr(this.props.item, attr, value);

  render() {
    const { item, currency, inc, dec } = this.props;
    const price = item.product.prices.find(
      (p) => p.currency.symbol === currency
    );
    return (
      <div className="cart-item">
        <div className="grow details">
          <div>{item.product.brand}</div>
          <div>{item.product.name}</div>
          <div>{priceToString(price)}</div>
          <div>
            {item.product.attributes.map((attribute) => (
              <ProductAttribute
                attr={attribute}
                onSetAttr={this.onSetAttr}
                selected={
                  item.attributes ? item.attributes[attribute.id] : undefined
                }
                key={attribute.id}
              />
            ))}
          </div>
        </div>
        <div className="cart-quantity-control">
          <button onClick={() => inc(item)}>+</button>
          {item.qty}
          <button onClick={() => dec(item)}>-</button>
        </div>
        <div className="cart-gallery">
          <img
            src={item.product.gallery[this.state.image]}
            alt={item.product.name}
          />
          <div className="cart-gallery-controls">
            <button onClick={this.onPrevImage}>{"<"}</button>
            <button onClick={this.onNextImage}>{">"}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
