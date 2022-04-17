import React, { Component } from 'react'

export class Main extends Component {
  render() {
    return (
      <div className={`main${this.props.minicartOpen ? " disabled" : ""}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Main