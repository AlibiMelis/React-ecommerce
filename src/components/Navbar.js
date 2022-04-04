import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../a-logo.svg";
import cart from "../cart.svg";

class Navbar extends Component {
  render() {
    const { categories, selectedCat, onCatSelect, currencies, selectedCur, onCurSelect } = this.props;

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
          <div>
            <select onChange={(e) => onCurSelect(e.target.value)}>
              {currencies.map((cur, ind) => (
                <option key={cur.symbol} value={cur.symbol}>{`${cur.symbol} ${cur.label}`}</option>
              ))}
            </select>
          </div>
          <div className="cart">
            <img src={cart} alt="Cart" />
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
