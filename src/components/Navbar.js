import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../a-logo.svg";
import cart from "../cart.svg";
import { setCurrency } from "../redux/Products/actions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  onCurrencyChange: (currency) => dispatch(setCurrency(currency)),
});
class Navbar extends Component {
  render() {
    const { categories, selectedCat, onCatSelect, currencies } = this.props;

    return (
      <nav className="navbar">
        <div className="categories-container">
          {categories.map((cat, ind) => (
            <button
              className={`category-item ${
                ind === selectedCat && "category-item-selected"
              }`}
              key={ind}
              onClick={() => onCatSelect(ind)}
              disabled={ind === selectedCat}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="controls">
          <ul>
            <li className="push-left">
              <select
                onChange={(e) => this.props.onCurrencyChange(e.target.value)}
              >
                {currencies.map((cur, ind) => (
                  <option
                    key={cur.symbol}
                    value={cur.symbol}
                  >{`${cur.symbol} ${cur.label}`}</option>
                ))}
              </select>
            </li>
            <li>
              <img src={cart} alt="Cart" className="cart"/>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(Navbar);
