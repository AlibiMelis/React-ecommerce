import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CartIcon } from "../assets/white-cart.svg";
import { connect } from "react-redux";
import { findProductPrice, priceToString } from "../lib/utils";

import "./ProductCard.css";

const mapStateToProps = (state) => ({
  currency: state.changeCurrency.currency,
});

class ProductCard extends Component {
  render() {
    const { product, currency, onAddToCart } = this.props;
    const { id, name, gallery, brand, inStock, category } = product;
    const price = findProductPrice(product, currency);

    return (
      <div className={`product-card-container ${inStock ? "in-stock" : "out-of-stock"}`}>
        <div className="add-to-cart" onClick={onAddToCart}>
          <CartIcon />
        </div>
        <Link to={`/shop/${category}/${id}`} className="link product-card">
          <img src={gallery[0]} alt={name} />
          <div className="product-card-label">
            <div className="product-card-name">{`${brand} ${name}`}</div>
            <div>{priceToString(price)}</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductCard);
