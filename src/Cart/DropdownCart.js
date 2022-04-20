import React, { Component, createRef } from "react";
import { ReactComponent as CartIcon } from "../cart.svg";
import { connect } from "react-redux";
import DropdownCartItem from "./DropdownCartItem";
import { decrementItemCount, incrementItemCount } from "../redux/actions";
import { Link } from "react-router-dom";
import "./Cart.css";

const mapStateToProps = (state) => ({
  items: state.changeCart.items,
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onIncrement: (item) => dispatch(incrementItemCount(item)),
  onDecrement: (item) => dispatch(decrementItemCount(item)),
});

class DropdownCart extends Component {
  constructor(props) {
    super(props);
    this.minicartRef = createRef();
    this.state = { open: false };
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onOutsideClick);
  }

  onMinicartClick = () => {
    if (!this.state.open) {
      document.addEventListener("mousedown", this.onOutsideClick);
    } else {
      document.removeEventListener("mousedown", this.onOutsideClick);
    }
    this.props.toggleMinicart();
    this.setState({ open: !this.state.open });
  };

  onOutsideClick = (event) => {
    if (!this.minicartRef.current?.contains(event.target)) {
      console.log("click");
      this.setState({ open: false });
      this.props.toggleMinicart();
      document.removeEventListener("mousedown", this.onOutsideClick);
    }
  };

  render() {
    const { items, currency, onIncrement, onDecrement } = this.props;
    const total = items
      .reduce((acc, item) => {
        return (
          acc +
          item.product.prices.find((p) => p.currency.symbol === currency)
            .amount *
            item.qty
        );
      }, 0)
      .toFixed(2);
    return (
      <div className="minicart-container" ref={this.minicartRef}>
        <div className="minicart-icon" onClick={this.onMinicartClick} cart-counter={items.length}>
          <CartIcon />
          {/* <div className="cart-counter">{items.length}</div> */}
        </div>
        {this.state.open && (
          <div className="dropdown">
            <div>{`My bag. ${items.length} items.`}</div>
            <div className="flex">
              {this.props.items.map((item, ind) => (
                <DropdownCartItem
                  item={item}
                  currency={currency}
                  key={ind}
                  inc={onIncrement}
                  dec={onDecrement}
                />
              ))}
            </div>
            <div className="total">
              <div>Total:</div>
              <div className="push-left">{`${currency}${total}`}</div>
            </div>
            <div className="dropdown-buttons">
              <Link
                to="/cart"
                className="link btn btn-secondary"
                onClick={() => {
                  this.setState({ open: false });
                  this.props.toggleMinicart();
                }}
              >
                View bag
              </Link>
              <Link
                to="/cart"
                className="link btn btn-primary"
                onClick={() => {
                  this.setState({ open: false });
                  this.props.toggleMinicart();
                }}
              >
                Check out
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownCart);
