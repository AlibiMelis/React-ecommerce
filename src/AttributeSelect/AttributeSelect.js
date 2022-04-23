import React, { Component } from "react";
import "./AttributeSelect.css";

class AttributeSelect extends Component {
  render() {
    const { attr, value, onChange, className = "", condensed = false } = this.props;
    const { name, type, items } = attr;

    return (
      <div className={"attribute-container " + className + (condensed ? " condensed" : " normal")}>
        {!condensed && <div className="attribute-name">{name + ":"}</div>}
        <div>
          {type === "text" && (
            <div className="attribute-options">
              {items.map((item) => (
                <div
                  className={"option text-option" + (value === item.id ? " text-selected" : "")}
                  onClick={() => onChange(item.id)}
                  key={item.id}
                >
                  {item.value}
                </div>
              ))}
            </div>
          )}

          {type === "swatch" && (
            <div className="attribute-options">
              {items.map((item) => (
                <div
                  className={"option color-option" + (value === item.id ? " color-selected" : "")}
                  onClick={() => onChange(item.id)}
                  style={{ background: item.value }}
                  key={item.id}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AttributeSelect;
