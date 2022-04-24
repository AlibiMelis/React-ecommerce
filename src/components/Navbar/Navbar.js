import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { setCurrency } from "../../redux/actions";
import Minicart from "../Minicart/Minicart";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import { ReactComponent as LogoIcon } from "../../assets/a-logo.svg";
import "./Navbar.css";

const mapStateToProps = (state) => ({ currency: state.currency.value });
const mapDispatchToProps = (dispatch) => ({
  onCurrencyChange: (currency) => dispatch(setCurrency(currency)),
});

class Navbar extends Component {
  render() {
    const { categories, currencies, currency, onCurrencyChange } = this.props;
    return (
      <nav className="navbar-container">
        <div className="navbar">
          <div className="navbar-section categories">
            {categories.map((cat) => (
              <NavLink
                className={(isActive) => "link category" + (isActive ? " selected" : " unselected")}
                to={`/shop/${cat.name}`}
                key={cat.name}
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
            <Minicart />
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
