import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import ProductList from "./ProductList/ProductList";
import ProductDetails from "./ProductDetails/ProductDetails";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/:category/:id" component={ProductDetails} />
            <Route path="/:category" component={ProductList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
