import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import Minicart from "../Minicart/Minicart";
import { ReactComponent as LogoIcon } from "../assets/a-logo.svg";
import { setCurrency } from "../redux/actions";
import { connect } from "react-redux";
import "./Navbar.css";
import CurrencySelect from "../CurrencySelect/CurrencySelect";

const mapStateToProps = (state) => ({
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onCurrencyChange: (currency) => dispatch(setCurrency(currency)),
});

class Navbar extends Component {
  render() {
    const { categories, currencies, toggleMinicart, minicartOpen, onCurrencyChange, currency } = this.props;

    return (
      <nav className="navbar-container">
        <div className="navbar">
          <div className="navbar-section categories">
            {categories.map((cat, ind) => (
              <NavLink
                className={(isActive) => "link category" + (isActive ? " selected" : " unselected")}
                to={`/shop/${cat.name}`}
                key={ind}
              >
                {cat.name}
              </NavLink>
            ))}
          </div>

          <div className="navbar-section logo">
            <Link to="/">
              <LogoIcon />
            </Link>
          </div>

          <div className="navbar-section controls">
            <CurrencySelect options={currencies} value={currency} onChange={onCurrencyChange} />
            <Minicart toggleMinicart={toggleMinicart} minicartOpen={minicartOpen} />
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
