import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/actions";
import { getCategories, getCurrencies } from "../../api/apollo";

import Navbar from "../Navbar/Navbar";
import ProductList from "../ProductList/ProductList";
import ProductDetails from "../ProductDetails/ProductDetails";
import Cart from "../Cart/Cart";
import "./ShopContainer.css";

const mapDispatchToProps = (dispatch) => ({
  onCurrencyChange: (currency) => dispatch(setCurrency(currency)),
});

class ShopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], currencies: [] };
  }

  componentDidMount() {
    const loadData = async () => {
      try {
        const { categories } = await getCategories();
        const { currencies } = await getCurrencies();
        this.setState({ currencies, categories });
        if (!this.props.currency) this.props.onCurrencyChange(currencies[0].symbol);
        if (window.location.pathname === "/shop" && categories.length) {
          window.location.href += "/" + categories[0].name;
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadData();
  }

  render() {
    const { categories, currencies } = this.state;
    return (
      <>
        <Navbar categories={categories} currencies={currencies} />
        <div className={"shop-container"}>
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

export default connect(() => ({}), mapDispatchToProps)(ShopContainer);
