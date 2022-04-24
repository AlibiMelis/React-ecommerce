import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MinicartItem from "./MinicartItem";
import { decrementItemCount, incrementItemCount, setItemAttribute } from "../../redux/actions";
import { calculateProductsTotal } from "../../utils/price";
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import "./Minicart.css";

const mapStateToProps = (state) => ({
  items: state.changeCart.items,
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onIncrement: (itemId) => () => dispatch(incrementItemCount(itemId)),
  onDecrement: (itemId) => () => dispatch(decrementItemCount(itemId)),
  onSetAttr: (itemId, newValue) => dispatch(setItemAttribute(itemId, newValue)),
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
    const { items, currency, onIncrement, onDecrement, onSetAttr, minicartOpen } = this.props;
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

            <div className="items">
              {this.props.items.map((item, ind) => (
                <MinicartItem
                  item={item}
                  currency={currency}
                  key={ind}
                  inc={onIncrement(item.id)}
                  dec={onDecrement(item.id)}
                  onSetAttr={onSetAttr}
                />
              ))}
            </div>

            <div className="total">
              <div>Total:</div>
              <div>{`${currency}${total}`}</div>
            </div>

            <div className="minicart-buttons">
              <Link to="/shop/cart" className="link btn btn-secondary" onClick={this.onMinicartClick}>
                View bag
              </Link>
              <Link to="#" className="link btn btn-primary" onClick={this.onMinicartClick}>
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
