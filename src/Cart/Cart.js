import React, { Component } from "react";
import { connect } from "react-redux";
import { decrementItemCount, incrementItemCount, setItemAttribute } from "../redux/actions";
import CartItem from "./CartItem";

const mapStateToProps = (state) => ({
  items: state.changeCart.items,
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onIncrement: (item) => dispatch(incrementItemCount(item)),
  onDecrement: (item) => dispatch(decrementItemCount(item)),
  onSetAttr: (item, attr, value) => dispatch(setItemAttribute(item, attr, value))
});

class Cart extends Component {
  render() {
    const { items, currency, onIncrement, onDecrement, onSetAttr } = this.props;

    return (
      <main className="left-aligned">
        <div className="header uppercase bold">Cart</div>
        <div className="cart-container">
          {items.map((item, ind) => (
            <CartItem item={item} onSetAttr={onSetAttr} currency={currency} inc={onIncrement} dec={onDecrement} key={ind}/>
          ))}
        </div>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
