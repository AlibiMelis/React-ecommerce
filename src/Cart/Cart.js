import React, { Component } from "react";
import { connect } from "react-redux";
import { decrementItemCount, incrementItemCount } from "../redux/actions";
import CartItem from "./CartItem";

const mapStateToProps = (state) => ({
  items: state.changeCart.items,
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onIncrement: (item) => dispatch(incrementItemCount(item)),
  onDecrement: (item) => dispatch(decrementItemCount(item)),
});

class Cart extends Component {
  render() {
    const { items } = this.props;

    return (
      <main className="left-aligned">
        <div className="header uppercase bold">Cart</div>
        <div className="cart-container">
          {items.map((item, ind) => (
            <CartItem item={item} currency={this.props.currency} inc={this.props.onIncrement} dec={this.props.onDecrement} key={ind}/>
          ))}
        </div>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
