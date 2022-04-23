import React, { Component } from "react";

export class Loader extends Component {
  render() {
    return this.props.show ? <div className="loader"></div> : null;
  }
}

export default Loader;
