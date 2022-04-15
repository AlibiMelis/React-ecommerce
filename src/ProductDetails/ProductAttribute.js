import React, { Component } from "react";
import "./ProductAttribute.css";

export class ProductAttribute extends Component {
  render() {
    const { attr, onSetAttr, selected } = this.props;
    return (
      <div>
        <div>{attr.name}</div>

        <div>
          {attr.type === "text" && (
            <div className="attribute-options">
              {attr.items.map((item) => (
                <div
                  className={`attribute-option${
                    selected === item.id ? " text-selected" : ""
                  }`}
                  onClick={() => onSetAttr(attr.id, item.id)}
                  key={item.id}
                >
                  {item.value}
                </div>
              ))}
            </div>
          )}

          {attr.type === "swatch" && (
            <div className="attribute-options">
              {attr.items.map((item) => (
                <div
                  className={`attribute-option${
                    selected === item.id ? " color-selected" : ""
                  }`}
                  onClick={() => onSetAttr(attr.id, item.id)}
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

export default ProductAttribute;
