import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrency } from "../redux/actions";
import { getCategories, getCurrencies } from "../lib/apolloClient";

import Navbar from "../Navbar/Navbar";
import ProductList from "../ProductList/ProductList";
import ProductDetails from "../ProductDetails/ProductDetails";
import Cart from "../Cart/Cart";
import "./ShopContainer.css";

const mapStateToProps = (state) => ({
  currency: state.changeCurrency.currency,
})
const mapDispatchToProps = (dispatch) => ({
  onCurrencyChange: (currency) => dispatch(setCurrency(currency)),
});

class ShopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { minicartOpen: false, categories: [], currencies: [] };
  }

  componentDidMount() {
    const loadData = async () => {
      const { categories } = await getCategories();
      const { currencies } = await getCurrencies();
      if (this.props.currency === "") this.props.onCurrencyChange(currencies[0].symbol);
      this.setState({ currencies, categories });
    };

    loadData();
  }

  toggleMinicart = () => {
    this.setState({ minicartOpen: !this.state.minicartOpen });
  };

  render() {
    const { minicartOpen, categories, currencies } = this.state;
    return (
      <>
        <Navbar
          categories={categories}
          currencies={currencies}
          toggleMinicart={this.toggleMinicart}
          minicartOpen={minicartOpen}
        />
        <div className={`shop-container${minicartOpen ? " inactive" : ""}`}>
          <Switch>
            <Route path="/shop/cart" component={Cart} />
            <Route path="/shop/:category/:id" component={ProductDetails} />
            <Route path="/shop/:category" component={ProductList} />
          </Switch>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer);
