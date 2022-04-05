import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CategoryListQuery, ProductListQuery } from "./lib/queries";
import ProductList from "./ProductList/ProductList";
import ProductDetails from "./ProductDetails/ProductDetails";
import { client } from "./lib/apolloClient";
import { requestProducts } from "./redux/Products/actions";
import { connect } from "react-redux";

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
      selectedCurrency: "$",
      selectedCategory: 0,
      categories: [],
      currencies: [],
      products: [],
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
        selectedCurrency: currencies[0].symbol,
      });
    };

    loadData();
  }

  onCatSelect = async (ind) => {
    this.props.onRequestProducts(this.state.categories[ind].name);

    this.setState({ selectedCategory: ind });
  };
  onCurSelect = async (symbol) => {
    this.setState({ selectedCurrency: symbol });
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
            selectedCur={this.state.selectedCurrency}
            onCurSelect={this.onCurSelect}
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
