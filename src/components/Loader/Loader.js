import React, { Component } from "react";

class Loader extends Component {
  render() {
    return <div className={"loader" + (this.props.center ? " center" : "")}></div>;
  }
}

export default Loader;
