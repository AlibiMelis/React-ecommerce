import React, { Component } from "react";

class DeleteButton extends Component {
  render() {
    const { onClick = () => {}, className } = this.props;
    return <div className={"btn-delete " + className} onClick={onClick}></div>;
  }
}

export default DeleteButton;
