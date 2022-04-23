import React, { Component } from "react";
import { connect } from "react-redux";
import { decrementItemCount, incrementItemCount, removeFromCart, setItemAttribute } from "../redux/actions";
import CartItem from "./CartItem";
import toast, { Toaster } from "react-hot-toast";
import "./Cart.css";

const mapStateToProps = (state) => ({
  items: state.changeCart.items,
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onIncrement: (item) => () => dispatch(incrementItemCount(item)),
  onDecrement: (item) => () => dispatch(decrementItemCount(item)),
  onSetAttr: (item) => (attr, value) => dispatch(setItemAttribute(item, attr, value)),
  onRemoveFromCart: (item) => dispatch(removeFromCart(item)),
});

class Cart extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  removeItemFromCart = (item) => () => {
    this.props.onRemoveFromCart(item);
    toast.success("Item is removed from your cart");
  };

  render() {
    const { items, currency, onIncrement, onDecrement, onSetAttr } = this.props;

    return (
      <main className="left-aligned">
        <Toaster position="bottom-right" />
        <div className="header cart-header">Cart</div>
        <div className="cart-container">
          {items.length ? (
            items.map((item, ind) => (
              <CartItem
                item={item}
                onSetAttr={onSetAttr(item)}
                currency={currency}
                inc={onIncrement(item)}
                dec={onDecrement(item)}
                onRemoveFromCart={this.removeItemFromCart(item)}
                key={ind}
              />
            ))
          ) : (
            <div>The cart is empty</div>
          )}
        </div>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
