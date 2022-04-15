import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../a-logo.svg";
import { setCurrency } from "../redux/actions";
import { connect } from "react-redux";
import DropdownCart from "../Cart/DropdownCart";
import { client } from "../lib/apolloClient";
import { CategoryListQuery } from "../lib/queries";

const mapDispatchToProps = (dispatch) => ({
  onCurrencyChange: (currency) => dispatch(setCurrency(currency)),
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
    };
  }

  componentDidMount() {
    const loadData = async () => {
      const { currencies, categories } = await client
        .query({ query: CategoryListQuery })
        .then((result) => result.data);
      this.setState({
        currencies,
        categories,
      });
    };

    loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { category } = this.props.match.params;
      console.log(category);
    }
  }

  render() {
    const category = window.location.pathname.split("/")[1];
    // console.log(category);
    const { categories, currencies } = this.state;

    return (
      <nav className="navbar-container">
        <div className="navbar">
          <div className="categories-container">
            {categories.map((cat, ind) => (
              <Link className="link" to={`/${cat.name}`} key={ind}>
                <div
                  className={`category-item ${
                    cat.name === category && "category-item-selected"
                  }`}
                >
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="logo">
            <Link to="/">
              <LogoIcon />
            </Link>
          </div>

          <div>
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
        </div>
      </nav>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(Navbar);
