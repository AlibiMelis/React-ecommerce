import React, { Component } from "react";
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
                <DropdownCartItem
                  item={item}
                  currency={this.props.currency}
                  key={ind}
                  inc={this.props.onIncrement}
                  dec={this.props.onDecrement}
                />
              ))}
            </div>
            <div className="total">
              <div>Total:</div>
              <div className="push-left">$100.00</div>
            </div>
            <div className="dropdown-buttons">
              <Link to="/cart" className="link btn btn-secondary">View bag</Link>
              <Link to="/cart" className="link btn btn-primary">Check out</Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownCart);
