import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ShopContainer from "./components/ShopContainer/ShopContainer";
import "./App.css";
import { Metatags } from "./components/shared";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Metatags />
        <Router>
          <Switch>
            <Route path="/shop" component={ShopContainer} />
            <Redirect from="/" to="/shop" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
