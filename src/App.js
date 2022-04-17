import "antd/dist/antd.css";
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import ProductList from "./ProductList/ProductList";
import ProductDetails from "./ProductDetails/ProductDetails";
import Cart from "./Cart/Cart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { minicartOpen: false };
  }

  toggleMinicart = () => {
    this.setState({ minicartOpen: !this.state.minicartOpen });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar toggleMinicart={this.toggleMinicart}/>
          <Main minicartOpen={this.state.minicartOpen}>
            <Switch>
              <Route path="/cart" component={Cart} />
              <Route path="/:category/:id" component={ProductDetails} />
              <Route path="/:category" component={ProductList} />
            </Switch>
          </Main>
        </Router>
      </div>
    );
  }
}

export default App;
