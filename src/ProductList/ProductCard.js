import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CartIcon } from "../cart.svg";
import { connect } from "react-redux";
import { categoryFromLocation, findProductPrice, priceToString } from "../lib/utils";
import { addToCart } from "../redux/actions";
import { getProduct } from "../lib/apolloClient";

import "./ProductCard.css";

const mapStateToProps = (state) => ({
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onAddToCart: (product, attributes) => dispatch(addToCart({ product, attributes })),
});
class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  onMouseOver = () => this.setState({ isHovered: true });
  onMouseOut = () => this.setState({ isHovered: false });

  handleAddToCart = async (id) => {
    const { product } = await getProduct(id);
    const attributes = product.attributes.reduce((acc, attr) => {
      acc[attr.id] = attr.items[0].id;
      return acc;
    }, {});
    this.props.onAddToCart(product, attributes); //TODO: add default attributes
  };

  render() {
    const category = categoryFromLocation();
    const { product } = this.props;
    const { id, name, gallery, brand, inStock } = product;
    const { currency } = this.props;
    const price = findProductPrice(product, currency);

    return (
      <div
        className={`product-card-container ${inStock ? "in-stock" : "out-of-stock"}`}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <button
          className="add-to-cart"
          hidden={!this.state.isHovered || !inStock}
          onClick={() => this.handleAddToCart(id)}
        >
          <CartIcon color="white" />
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
