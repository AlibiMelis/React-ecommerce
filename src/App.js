import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { CategoryListQuery, ProductListQuery } from "./lib/queries";
import ProductList from "./ProductList/ProductList";
import ProductDetails from "./ProductDetails/ProductDetails";
import { client } from "./lib/apolloClient";
import { requestProducts } from "./redux/actions";
import { connect } from "react-redux";
import { render } from "react-dom";

const mapStateToProps = (state) => ({
  isPending: state.requestProducts.isPending,
  products: state.requestProducts.products,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestProducts: (category) => dispatch(requestProducts(category)),
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 0,
      categories: [],
      currencies: [],
    };
  }

  componentDidMount() {
    const loadData = async () => {
      const { currencies, categories } = await client
        .query({ query: CategoryListQuery })
        .then((result) => result.data);

      this.props.onRequestProducts(categories[0].name);

      this.setState({
        currencies,
        categories,
      });
    };

    loadData();
  }

  onCatSelect = async (ind) => {
    this.props.onRequestProducts(this.state.categories[ind].name);

    this.setState({ selectedCategory: ind });
  };
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            categories={this.state.categories}
            selectedCat={this.state.selectedCategory}
            onCatSelect={this.onCatSelect}
            currencies={this.state.currencies}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  products={this.props.products}
                  selectedCur={this.state.selectedCurrency}
                />
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProductDetails selectedCur={this.state.selectedCurrency} />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);