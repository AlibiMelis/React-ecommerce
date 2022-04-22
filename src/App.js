import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ShopContainer from "./ShopContainer/ShopContainer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <ShopContainer />
        </Router>
      </div>
    );
  }
}

export default App;
