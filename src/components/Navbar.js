import React, { Component } from "react";
import logo from "../a-logo.svg";
import cart from "../cart.svg";

class Navbar extends Component {
  render() {
    const { categories, selected, onSelect } = this.props;

    return (
      <nav className="navbar">
        <div className="categories-container">
          {categories.map((cat, ind) => (
            <button
              className={`category-item ${
                ind === selected && "category-item-selected"
              }`}
              key={ind}
              onClick={() => onSelect(ind)}
            >
              {cat.name}
            </button>
          ))}
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
