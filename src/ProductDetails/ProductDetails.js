import React, { Component } from "react";
import { getProduct } from "../lib/apolloClient";
import { connect } from "react-redux";
import { addToCart } from "../redux/actions";
import { findProductPrice, priceToString } from "../lib/utils";

import toast, { Toaster } from "react-hot-toast";
import ProductAttribute from "./ProductAttribute";
import Loader from "../SharedComponents/Loader";
import "./ProductDetails.css";

const mapStateToProps = (state) => ({
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  addToCart: (product, attributes) => dispatch(addToCart({ product, attributes: { ...attributes } })),
});

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      product: null,
      image: "",
      attributes: {},
    };
  }

  componentDidMount() {
    const loadDetails = async (id) => {
      this.setState({ loading: true });
      const { product } = await getProduct(id);
      if (!product) return this.setState({ loading: false });
      this.setState({ product, image: product.gallery[0], loading: false });
    };

    loadDetails(this.props.match.params.id);
  }

  onChangeImage = (img) => this.setState({ image: img });

  onSetAttr = (attr, value) => {
    const attributes = { ...this.state.attributes };
    attributes[attr] = value;
    this.setState({ attributes });
  };

  onAddToCart = () => {
    const { product, attributes } = this.state;
    let complete = true;
    for (const attr of product.attributes) {
      if (!attributes[attr.id]) {
        toast.error(`Please, select ${attr.name}`);
        complete = false;
      }
    }
    if (!complete) return;

    this.props.addToCart(product, attributes);
    toast.success("Added to your cart");
  };

  render() {
    const { product, loading } = this.state;
    const { currency } = this.props;

    return (
      <main className="left-aligned">
        {!loading ? (
          product ? (
            <div className="product-container">
              <Toaster position="bottom-right" />
              <div className="product-gallery">
                {product.gallery.map((img, ind) => (
                  <img src={img} onClick={() => this.onChangeImage(img)} alt={product.name} key={`image${ind}`} />
                ))}
              </div>
              <div className="product-image">
                <img src={this.state.image} alt={product.name} />
              </div>

              <div className="product-details">
                <div className="brand">{product.brand}</div>
                <div className="name">{product.name}</div>

                <div className="attributes">
                  {product.attributes.map((attribute) => (
                    <ProductAttribute
                      attr={attribute}
                      onSetAttr={this.onSetAttr}
                      selected={this.state.attributes[attribute.id]}
                      className="attribute"
                      key={attribute.id}
                    />
                  ))}
                </div>

                <div className="price">
                  <span>Price:</span>
                  <div className="price-tag">{priceToString(findProductPrice(product, currency))}</div>
                </div>

                <div
                  className={`add-to-cart ${product.inStock ? "active" : "inactive"}`} // TODO: is this a good way to create button?
                  onClick={product.inStock ? this.onAddToCart : null}
                ></div>

                <div className="description" dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
            </div>
          ) : (
            <div>Sorry, product not found</div>
          )
        ) : (
          <Loader show />
        )}
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
