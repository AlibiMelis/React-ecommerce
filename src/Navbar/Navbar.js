import React, { Component } from "react";
import { Link } from "react-router-dom";

import Minicart from "../Minicart/Minicart";
import { ReactComponent as LogoIcon } from "../assets/a-logo.svg";
import { categoryFromLocation } from "../lib/utils";
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
  constructor(props) {
    super(props);
    this.state = { category: "" };
  }

  setCategory = (category) => this.setState({ category });

  componentDidMount() {
    this.setState({ category: categoryFromLocation() });
  }

  render() {
    const { category } = this.state;
    const { categories, currencies, toggleMinicart, minicartOpen, onCurrencyChange, currency } = this.props;

    return (
      <nav className="navbar-container">
        <div className="navbar">
          <div className="navbar-section categories">
            {categories.map((cat, ind) => (
              <Link className="link" to={`/shop/${cat.name}`} onClick={() => this.setCategory(cat.name)} key={ind}>
                <div className={`category${cat.name === category ? " selected" : " unselected"}`}>{cat.name}</div>
              </Link>
            ))}
          </div>

          <div className="navbar-section logo">
            <Link to={`/shop/${categories[0]?.name}`}>
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
