import React, { Component } from "react";
import logo from "../a-logo.svg";
import cart from "../cart.svg";

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
          <img src={logo} alt="Logo" />
        </div>

        <div className="controls">
          <div>
            <select>
              {currencies.map((cur, ind) => (
                <option key={cur.symbol}>{`${cur.symbol} ${cur.label}`}</option>
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
