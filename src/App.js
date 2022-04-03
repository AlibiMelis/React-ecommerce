import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { CategoryListQuery, ProductListQuery } from "./lib/queries";
import ProductList from "./ProductList/ProductList";
import ProductDetails from "./ProductDetails/ProductDetails";

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 0,
      selectedCurrency: 0,
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

      const { products } = await client
        .query({
          query: ProductListQuery(categories[0].name),
        })
        .then((result) => result.data.category);

      this.setState({ currencies, categories, products });
    };

    loadData();
  }

  onCatSelect = async (ind) => {
    const { products } = await client
      .query({
        query: ProductListQuery(this.state.categories[ind].name),
      })
      .then((result) => result.data.category);

    this.setState({ selectedCategory: ind, products });
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
          />

          <Routes>
            <Route
              path="/"
              element={<ProductList products={this.state.products} />}
            />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
