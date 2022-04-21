import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MinicartItem from "./MinicartItem";
import { decrementItemCount, incrementItemCount } from "../redux/actions";
import { calculateProductsTotal } from "../lib/utils";
import { ReactComponent as CartIcon } from "../cart.svg";
import "./Minicart.css";

const mapStateToProps = (state) => ({
  items: state.changeCart.items,
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onIncrement: (item) => () => dispatch(incrementItemCount(item)),
  onDecrement: (item) => () => dispatch(decrementItemCount(item)),
});

class Minicart extends Component {
  constructor(props) {
    super(props);
    this.minicartRef = createRef();
  }

  onOutsideClick = (event) => {
    if (!this.minicartRef.current?.contains(event.target)) {
      this.props.toggleMinicart();
      document.removeEventListener("mousedown", this.onOutsideClick);
    }
  };
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onOutsideClick);
  }

  onMinicartClick = () => {
    if (!this.props.minicartOpen) {
      document.addEventListener("mousedown", this.onOutsideClick);
    } else {
      document.removeEventListener("mousedown", this.onOutsideClick);
    }
    this.props.toggleMinicart();
  };

  render() {
    const { items, currency, onIncrement, onDecrement, minicartOpen, toggleMinicart } = this.props;
    const total = calculateProductsTotal(items, currency).toFixed(2);

    return (
      <div className="minicart-container" ref={this.minicartRef}>
        <div className="minicart-icon" onClick={this.onMinicartClick} cart-counter={items.length}>
          <CartIcon />
        </div>
        {minicartOpen && (
          <div className="minicart">
            <div>
              <span style={{ fontWeight: "bold" }}>My bag,</span>
              {` ${items.length} items.`}
            </div>

            {this.props.items.map((item, ind) => (
              <MinicartItem item={item} currency={currency} key={ind} inc={onIncrement(item)} dec={onDecrement(item)} />
            ))}

            <div className="total">
              <div>Total:</div>
              <div>{`${currency}${total}`}</div>
            </div>

            <div className="minicart-buttons">
              <Link to="/shop/cart" className="link btn btn-secondary" onClick={toggleMinicart}>
                View bag
              </Link>
              <Link to="#" className="link btn btn-primary" onClick={toggleMinicart}>
                Check out
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);
