import React, { Component } from "react";

class ProductCard extends Component {
  render() {
    const { name, gallery, prices } = this.props.product;
    return (
      <div className="product-card">
        <div className="product-card-img">
          <img src={gallery[0]} alt={name} />
        </div>
        <div>
          {name}
        </div>
        <div>
          {prices[0].currency.symbol}{prices[0].amount}
        </div>
      </div>
    );
  }
}

export default ProductCard;
