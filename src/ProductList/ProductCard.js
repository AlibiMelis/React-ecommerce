import React, { Component } from "react";
import { Link } from "react-router-dom";
import cart from "../white-cart.svg";
import { connect } from "react-redux";
import { priceToString } from "../lib/utils";
import { addToCart } from "../redux/actions";
import { getProduct } from "../lib/apolloClient";

const mapStateToProps = (state) => ({
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onAddToCart: (product, attributes) =>
    dispatch(addToCart({ product, attributes })),
});
class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  onMouseOver = () => {
    this.setState({ isHovered: true });
  };
  onMouseOut = () => {
    this.setState({ isHovered: false });
  };
  handleAddToCart = async (id) => {
    const { product } = await getProduct(id);
    this.props.onAddToCart(product); //TODO: add default attributes
  };

  render() {
    const category = window.location.pathname.split("/")[1];
    const { id, name, gallery, prices, brand } = this.props.product;

    const price = prices.find((p) => p.currency.symbol === this.props.currency);

    return (
      <div
        className="product-card-container"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <button
          className="cart-in-card"
          hidden={!this.state.isHovered}
          onClick={() => this.handleAddToCart(id)}
        >
          <img src={cart} alt="Add to cart" />
        </button>
        <Link to={`/${category}/${id}`} className="link product-link">
          <div className="product-card">
            <div className="product-card-img">
              <img src={gallery[0]} alt={name} />
            </div>
            <div className="product-card-label">
              <div className="product-card-name">{`${brand} ${name}`}</div>
              <div className="product-card-price">{priceToString(price)}</div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
