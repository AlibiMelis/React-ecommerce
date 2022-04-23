import React, { Component, createRef } from "react";
import "./CurrencySelect.css";

export class CurrencySelect extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.selectRef = createRef();
  }

  onOutsideClick = (event) => {
    if (!this.selectRef.current?.contains(event.target)) {
      this.toggleCurrencySelect();
      document.removeEventListener("mousedown", this.onOutsideClick);
    }
  };
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onOutsideClick);
  }

  toggleCurrencySelect = () => {
    if (!this.state.open) {
      document.addEventListener("mousedown", this.onOutsideClick);
    } else {
      document.removeEventListener("mousedown", this.onOutsideClick);
    }
    this.setState({ open: !this.state.open });
  }
  onCurrencySelect = (newValue) => {
    this.toggleCurrencySelect();
    this.props.onChange(newValue);
  };

  render() {
    const { options, value } = this.props;
    return (
      <div className={`cur-select${this.state.open ? " open" : ""}`} ref={this.selectRef}>
        <div className="cur-value" onClick={this.toggleCurrencySelect}>
          {value}
        </div>
        <div className="dropdown">
          {options.map((opt) => (
            <div
              className={`option${opt.symbol === value ? " selected" : ""}`}
              onClick={() => this.onCurrencySelect(opt.symbol)}
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
