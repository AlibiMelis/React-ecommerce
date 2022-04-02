import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.categories = [{ name: "All" }, { name: "Clothes" }, { name: "Tech" }];
    this.currencies = [
      {
        symbol: "$",
        label: "USD",
      },
      {
        symbol: "£",
        label: "GBP",
      },
      {
        symbol: "A$",
        label: "AUD",
      },
      {
        symbol: "¥",
        label: "JPY",
      },
      {
        symbol: "₽",
        label: "RUB",
      },
    ];
    this.state = {
      selectedCategory: 0,
      selectedCurrency: 0,
    };
  }

  onCatSelect = (ind) => {
    this.setState({ selectedCategory: ind });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            categories={this.categories}
            selectedCat={this.state.selectedCategory}
            onCatSelect={this.onCatSelect}
            currencies={this.currencies}
            selectedCur={this.state.selectedCurrency}
          />
        </Router>
      </div>
    );
  }
}

export default App;
