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

      const { products } = await client
        .query({
          query: ProductListQuery(categories[0].name),
        })
        .then((result) => result.data.category);

      this.setState({
        currencies,
        categories,
        products,
        selectedCurrency: currencies[0].symbol,
      });
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
              element={<ProductList products={this.state.products} selectedCur={this.state.selectedCurrency}/>}
            />
            <Route path="/products/:id" element={<ProductDetails selectedCur={this.state.selectedCurrency} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
