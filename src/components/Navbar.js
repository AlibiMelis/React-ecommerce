import React, { Component } from "react";
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
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="controls">
          <select>
            {currencies.map((cur, ind) => (
              <option key={cur.symbol}>
                {`${cur.symbol} ${cur.label}`}
              </option>
            ))}
          </select> 
          <img src={cart} />
        </div>
      </nav>
    );
  }
}

export default Navbar;

<ul>
  <li>All</li>
  <li>Clothes</li>
  <li>Tech</li>
  <li>
    <img src={logo} />
  </li>
  <li className="push-left">
    <select>
      <option selected>USD</option>
      <option>EUR</option>
      <option>JPY</option>
    </select>
  </li>
  <li>
    <img src={cart} />
  </li>
</ul>;
