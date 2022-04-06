import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../a-logo.svg";
import { setCurrency } from "../redux/actions";
import { connect } from "react-redux";
import DropdownCart from "../Cart/DropdownCart";

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
            <LogoIcon />
          </Link>
        </div>

        <div >
          <ul className="controls">
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
              <DropdownCart />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(Navbar);
