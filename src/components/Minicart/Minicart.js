import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MinicartItem from "./MinicartItem";
import { decrementItemCount, incrementItemCount, setItemAttribute } from "../../redux/actions";
import { calculateProductsTotal } from "../../utils/price";
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import "./Minicart.css";

const mapStateToProps = (state) => ({
  items: state.cart.items,
  currency: state.currency.value,
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
    this.buttonRef = createRef();
    this.state = { open: false };
  }

  onOutsideClick = (event) => {
    if (!this.minicartRef.current?.contains(event.target) && !this.buttonRef.current?.contains(event.target)) {
      this.close();
    }
  };
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onOutsideClick);
  }

  onMinicartClick = () => {
    if (!this.state.open) {
      this.open();
    } else {
      this.close();
    }
  };

  open = () => {
    document.addEventListener("mousedown", this.onOutsideClick);
    this.setState({ open: true })
  }

  close = () => {
    document.removeEventListener("mousedown", this.onOutsideClick);
    this.setState({ open: false })
  }

  render() {
    const { items, currency, onIncrement, onDecrement, onSetAttr } = this.props;
    const { open } = this.state;
    const total = calculateProductsTotal(items, currency).toFixed(2);

    return (
      <div className="minicart-container">
        <div className="minicart-icon" onClick={this.onMinicartClick} cart-counter={items.length} ref={this.buttonRef}>
          <CartIcon />
        </div>
        {open && (
          <>
            <div className="minicart-bg">
              <div className="minicart" ref={this.minicartRef}>
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
                      onSetAttr={(attr) => onSetAttr(item.id, attr)}
                    />
                  ))}
                </div>

                <div className="total">
                  <div>Total:</div>
                  <div>{`${currency}${total}`}</div>
                </div>

                <div className="minicart-buttons">
                  <Link to="/shop/cart" className="link btn btn-secondary" onClick={this.close}>
                    View bag
                  </Link>
                  <Link to="#" className="link btn btn-primary" onClick={this.close}>
                    Check out
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);
