import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [{ name: "All" }, { name: "Clothes" }, { name: "Tech" }],
      selectedCatigory: 0,
    };
  }

  onSelect = (ind) => {
    this.setState({ selectedCatigory: ind });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            categories={this.state.categories}
            selected={this.state.selectedCatigory}
            onSelect={this.onSelect}
          />
        </Router>
      </div>
    );
  }
}

export default App;
