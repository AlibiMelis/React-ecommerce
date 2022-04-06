import React, { Component } from "react";
import { Link } from "react-router-dom";
import cart from "../white-cart.svg";
import { connect } from "react-redux";
import { priceToString } from "../lib/utils";

const mapStateToProps = (state) => ({ currency: state.changeCurrency.currency });
class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  onMouseEnter = () => {
    this.setState({ isHovered: true });
  };
  onMouseOut = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { id, name, gallery, prices, brand } = this.props.product;
    
    const price = prices.find((p) => p.currency.symbol === this.props.currency);

    return (
      <div
        className="product-card-container"
        onMouseOver={this.onMouseEnter}
        onMouseOut={this.onMouseOut}
      >
        <Link to={`/products/${id}`} className="product-link">
          <div className="product-card">
            <div className="product-card-img">
              <img src={gallery[0]} alt={name} />
            </div>
            <div className="product-card-label">
              <div className="product-card-name">{`${brand} ${name}`}</div>
              <div className="product-card-price">
                {priceToString(price)}
              </div>
            </div>
          </div>
        </Link>
        <button className="cart-in-card" hidden={!this.state.isHovered} onClick={() => {}}>
          <img src={cart} alt="Add to cart" />
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductCard);
