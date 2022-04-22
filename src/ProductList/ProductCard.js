import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CartIcon } from "../cart.svg";
import { connect } from "react-redux";
import { categoryFromLocation, findProductPrice, priceToString } from "../lib/utils";


import "./ProductCard.css";

const mapStateToProps = (state) => ({
  currency: state.changeCurrency.currency,
});

class ProductCard extends Component {
  render() {
    const category = categoryFromLocation();
    const { product, currency, onAddToCart } = this.props;
    const { id, name, gallery, brand, inStock } = product;
    const price = findProductPrice(product, currency);

    return (
      <div
        className={`product-card-container ${inStock ? "in-stock" : "out-of-stock"}`}
        // onMouseOver={this.onMouseOver}
        // onMouseOut={this.onMouseOut}
      >
        <div
            className="add-to-cart"
            // hidden={this.state.isHovered && inStock}
            onClick={onAddToCart}
          >
            <CartIcon color="white" /> 
            {/* TODO: Doesn't change color */}
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
