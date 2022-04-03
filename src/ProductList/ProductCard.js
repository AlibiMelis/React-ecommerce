import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  render() {
    const { id, name, gallery, prices, brand } = this.props.product;
    return (
      <div className="product-card-container">
        <Link to={`/products/${id}`} className="product-link">
          <div className="product-card">
            <div className="product-card-img">
              <img src={gallery[0]} alt={name} />
            </div>
            <div className="product-card-label">
              <div className="product-card-name">{`${brand} ${name}`}</div>
              <div className="product-card-price">
                {prices[0].currency.symbol}
                {prices[0].amount}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
