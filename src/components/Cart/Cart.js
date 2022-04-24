import React, { Component } from "react";
import { connect } from "react-redux";
import { decrementItemCount, incrementItemCount, removeFromCart, setItemAttribute } from "../../redux/actions";
import CartItem from "./CartItem";
import toast, { Toaster } from "react-hot-toast";
import "./Cart.css";

const mapStateToProps = (state) => ({
  items: state.cart.items,
  currency: state.currency.value,
});
const mapDispatchToProps = (dispatch) => ({
  onIncrement: (itemId) => () => dispatch(incrementItemCount(itemId)),
  onDecrement: (itemId) => () => dispatch(decrementItemCount(itemId)),
  onSetAttr: (itemId) => (newValue) => dispatch(setItemAttribute(itemId, newValue)),
  onRemoveFromCart: (itemId) => dispatch(removeFromCart(itemId)),
});

class Cart extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  removeItemFromCart = (itemId) => () => {
    this.props.onRemoveFromCart(itemId);
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
                onSetAttr={onSetAttr(item.id)}
                currency={currency}
                inc={onIncrement(item.id)}
                dec={onDecrement(item.id)}
                onRemoveFromCart={this.removeItemFromCart(item.id)}
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
