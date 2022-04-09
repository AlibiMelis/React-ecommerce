import React, { Component } from 'react'
import { priceToString } from '../lib/utils';
import "./Cart.css";

export class CartItem extends Component {
  render() {
    const { item, currency, inc, dec } = this.props;
    const price = item.product.prices.find(p => p.currency.symbol === currency);
    return (
      <div className="cart-item">
        <div className="flex-3">
          <div>{item.product.brand}</div>
          <div>{item.product.name}</div>
          <div>{priceToString(price)}</div>
        </div>
        <div className="quantity-control">
          <button onClick={() => inc(item)}>+</button>
          {item.qty}
          <button onClick={() => dec(item)}>-</button>
        </div>
        <div className="flex-2">
          <img src={item.product.gallery[0]} alt={item.product.name} />
        </div>
      </div>
    )
  }
}

export default CartItem