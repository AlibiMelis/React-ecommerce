import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import ShopContainer from "./components/ShopContainer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
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
