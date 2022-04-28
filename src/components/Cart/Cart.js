import React, { Component } from "react";
import { connect } from "react-redux";
import { decrementItemCount, incrementItemCount, removeFromCart, setItemAttribute, showToast } from "../../redux/actions";
import CartItem from "./CartItem";
import { Metatags, Toast } from "../shared";
import "./Cart.css";

const mapStateToProps = (state) => ({
  items: state.cart.items,
  currency: state.currency.value,
});
const mapDispatchToProps = {
  incrementItemCount,
  decrementItemCount,
  setItemAttribute,
  removeFromCart,
  showToast
};

class Cart extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  removeItemFromCart = (itemId) => {
    this.props.removeFromCart(itemId);
    this.props.showToast("Item is removed from your cart", "success");
  };

  render() {
    const { items, currency, incrementItemCount, decrementItemCount, setItemAttribute } = this.props;

    return (
      <main className="left-aligned">
        <Metatags title="Shopping Cart" />
        <Toast />
        <div className="header cart-header">Cart</div>
        <div className="cart-container">
          {items.length ? (
            items.map((item) => (
              <CartItem
                item={item}
                currency={currency}
                onInc={() => incrementItemCount(item.id)}
                onDec={() => decrementItemCount(item.id)}
                onSetAttr={(attr) => setItemAttribute(item.id, attr)}
                onRemove={() => this.removeItemFromCart(item.id)}
                key={item.id}
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
