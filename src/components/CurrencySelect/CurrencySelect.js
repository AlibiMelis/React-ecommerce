import React, { Component, createRef } from "react";
import "./CurrencySelect.css";

class CurrencySelect extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.selectRef = createRef();
  }

  onOutsideClick = (event) => {
    if (!this.selectRef.current?.contains(event.target)) {
      this.toggle();
      document.removeEventListener("mousedown", this.onOutsideClick);
    }
  };
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onOutsideClick);
  }

  toggle = () => {
    if (!this.state.open) {
      document.addEventListener("mousedown", this.onOutsideClick);
    } else {
      document.removeEventListener("mousedown", this.onOutsideClick);
    }
    this.setState({ open: !this.state.open });
  };

  onSelect = (newValue) => {
    const { onChange } = this.props;
    onChange(newValue);
    this.toggle();
  };

  render() {
    const { options, value } = this.props;
    return (
      <div className={"cur-select" + (this.state.open ? " open" : "")} ref={this.selectRef}>
        <div className="cur-value" onClick={this.toggle}>
          {value}
        </div>
        <div className="dropdown">
          {options.map((opt) => (
            <div
              className={"option" + (opt.symbol === value ? " selected" : "")}
              onClick={() => this.onSelect(opt.symbol)}
              key={opt.symbol}
            >
              {`${opt.symbol} ${opt.label}`}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CurrencySelect;
