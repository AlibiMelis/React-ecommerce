import React, { Component } from "react";
import { getProduct } from "../lib/apolloClient";
import "./ProductDetails.css";
import { connect } from "react-redux";
import { addToCart } from "../redux/actions";
import { priceToString } from "../lib/utils";
import ProductAttribute from "./ProductAttribute";

const mapStateToProps = (state) => ({
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onAddToCart: (product, attributes) =>
    dispatch(addToCart({ product, attributes: { ...attributes } })),
});

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      image: "",
      attributes: {},
    };
  }

  componentDidMount() {
    const loadDetails = async (id) => {
      const { product } = await getProduct(id);
      this.setState({ product, image: product.gallery[0] });
    };

    loadDetails(this.props.match.params.id);
  }

  onSetAttr = (attr, value) => {
    const attributes = { ...this.state.attributes };
    attributes[attr] = value;
    this.setState({ attributes });
  };

  render() {
    console.log("Rendeing", this.state.attributes);
    const { product, attributes } = this.state;
    const { currency } = this.props;

    return (
      <main className="left-aligned">
        {product && (
          <div className="product-container">
            <div className="product-gallery">
              {product.gallery.map((img, ind) => (
                <div
                  className="product-gallery-image"
                  key={`image${ind}`}
                  onClick={() => this.setState({ image: img })}
                >
                  <img src={img} alt={product.name} />
                </div>
              ))}
            </div>
            <div className="product-image">
              <img src={this.state.image} alt={product.name} />
            </div>
            <div className="product-details">
              <div className="big-text semibold-text">{product.brand}</div>
              <div className="big-text name">{product.name}</div>
              <div>
                {product.attributes.map((attribute) => (
                  <ProductAttribute
                    attr={attribute}
                    onSetAttr={this.onSetAttr}
                    selected={this.state.attributes[attribute.id]}
                    key={attribute.id}
                  />
                ))}
              </div>
              <div className="bold-text uppercase">
                <span className="price-label">Price:</span>
                <div className="price">
                  {priceToString(
                    product.prices.find((p) => p.currency.symbol === currency)
                  )}
                </div>
              </div>
              {product.inStock ? (
                <div
                  className="add-to-cart uppercase active"
                  onClick={() => this.props.onAddToCart(product, attributes)}
                >
                  add to cart
                </div>
              ) : (
                <div className="add-to-cart uppercase inactive">
                  sorry, out of stock
                </div>
              )}
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        )}
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
