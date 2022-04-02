import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { CategoryListQuery, ProductListQuery } from "./lib/queries";
import ProductList from "./ProductList/ProductList";

const client = new ApolloClient({
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

  async componentDidMount() {
    const { currencies, categories } = await client
      .query({ query: CategoryListQuery })
      .then((result) => result.data);

    const query = ProductListQuery(categories[0].name)
    console.log(query)

    const { products } = await client
      .query({
        query: query,
      })
      .then((result) => result.data);
    console.log('didmount ',products)
    this.setState({ currencies, categories, products });
  }

  onCatSelect = (ind) => {
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
            selectedCur={this.state.selectedCurrency}
          />

          <Routes>
            <Route
              path="/"
              exact
              element={<ProductList products={this.state.products} />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
