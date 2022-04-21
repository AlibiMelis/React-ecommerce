import React, { Component } from "react";
import { Select } from "antd";
import { Link } from "react-router-dom";

import DropdownCart from "../Cart/DropdownCart";

import { setCurrency } from "../redux/actions";
import { connect } from "react-redux";


import "./Navbar.css";
import { ReactComponent as LogoIcon } from "../a-logo.svg";
import { categoryFromLocation } from "../lib/utils";

const mapStateToProps = (state) => ({
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onCurrencyChange: (currency) => dispatch(setCurrency(currency)),
});

class Navbar extends Component {

  // TODO: How to rerender the navbar based on the location
  // componentDidUpdate(prevProps) {
  //   if (this.props.location !== prevProps.location) {
  //     const { category } = this.props.match.params;
  //     console.log(category);
  //   }
  // }

  render() {
    const category = categoryFromLocation();
    const { categories, currencies, toggleMinicart, minicartOpen } = this.props;
    const { onCurrencyChange } = this.props;

    return (
      <nav className="navbar-container">
        <div className="navbar-section categories">
          {categories.map((cat, ind) => (
            <Link className="link" to={`/shop/${cat.name}`} key={ind}>
              <div className={`category${cat.name === category ? " selected" : " unselected"}`}>{cat.name}</div>
            </Link>
          ))}
        </div>

        <div className="navbar-section logo">
          <Link to="/">
            <LogoIcon />
          </Link>
        </div>

        <div className="navbar-section controls">
          {/* {this.state.currencies.length && ( */}
            <Select
              value={this.props.currency}
              onChange={onCurrencyChange}
              optionLabelProp="value"
              className="currency-select"
              bordered={false}
            >
              {currencies.map((cur) => (
                <Select.Option value={cur.symbol} key={cur.symbol}>
                  {`${cur.symbol}${cur.label}`}
                </Select.Option>
              ))}
            </Select>
          {/* )} */}
          <DropdownCart toggleMinicart={toggleMinicart} minicartOpen={minicartOpen} />
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
