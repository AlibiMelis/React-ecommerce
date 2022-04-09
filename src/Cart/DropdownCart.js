import React, { Component } from "react";
import { ReactComponent as CartIcon } from "../cart.svg";
import { connect } from "react-redux";
import { priceToString } from "../lib/utils";

const mapStateToProps = (state) => ({
  items: state.changeCart.items,
  currency: state.changeCurrency.currency,
});

class DropdownCart extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ open: !this.state.open })}>
          <CartIcon />{" "}
        </button>
        {this.state.open && (
          <div className="dropdown">
            <div>{`My bag. ${this.props.items.length} items.`}</div>
            <div className="flex">
              {this.props.items.map((item, ind) => (
                <DropdownCartItem item={item} currency={this.props.currency} key={ind} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

class DropdownCartItem extends Component {
  render() {
    const { item, currency } = this.props;
    const price = item.product.prices.find(p => p.currency.symbol === currency);
    return (
      <div className="dropdown-cart-item">
        <div className="flex-3">
          <div>{item.product.brand}</div>
          <div>{item.product.name}</div>
          <div>{priceToString(price)}</div>
        </div>
        <div className="quantity-control">
          <button>+</button>
          {item.qty}
          <button>-</button>
        </div>
        <div className="flex-2">
          <img src={item.product.gallery[0]} alt={item.product.name} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DropdownCart);
