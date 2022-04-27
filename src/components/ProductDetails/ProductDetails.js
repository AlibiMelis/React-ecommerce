import React, { Component } from "react";
import { connect } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addToCart } from "../../redux/actions";
import { getProduct } from "../../api/apollo";
import { findProductPrice, priceToString } from "../../utils/price";
import AttributeSelect from "../AttributeSelect/AttributeSelect";
import { Loader, Purify } from "../shared";
import "./ProductDetails.css";

const mapStateToProps = (state) => ({
  currency: state.currency.value,
});
const mapDispatchToProps = { addToCart };

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
      try {
        this.setState({ loading: true });
        const { product } = await getProduct(id);
        this.setState({ product, image: product.gallery[0], loading: false });
        window.scrollTo(0, 0);
      } catch (e) {
        console.log(e);
      } finally {
        this.setState({ loading: false });
      }
    };

    loadDetails(this.props.match.params.id);
  }

  onChangeImage = (img) => this.setState({ image: img });
  onSetAttr = (attr, value) => {
    const newAttr = {};
    newAttr[attr] = value;
    this.setState({ attributes: { ...this.state.attributes, ...newAttr } });
  };
  onAddToCart = () => {
    const { product, attributes } = this.state;
    let allSelected = true;
    for (const attr of product.attributes) {
      if (!attributes[attr.id]) {
        toast.error(`Please, select ${attr.name}`);
        allSelected = false;
      }
    }
    if (!allSelected) return;

    this.props.addToCart(product, attributes);
    toast.success("Added to your cart");
  };

  render() {
    const { product, loading } = this.state;
    const { currency } = this.props;
    return (
      <main className="left-aligned">
        <Toaster position="bottom-right" />
        {!loading ? (
          product ? (
            <div className="product-container">
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
                    <AttributeSelect
                      attr={attribute}
                      value={this.state.attributes[attribute.id]}
                      onChange={(value) => this.onSetAttr(attribute.id, value)}
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
                  className={"add-to-cart" + (product.inStock ? " active" : " inactive")}
                  onClick={product.inStock ? this.onAddToCart : null}
                ></div>

                <Purify className="description" content={product.description} />
              </div>
            </div>
          ) : (
            <div>Sorry, product not found</div>
          )
        ) : (
          <Loader center />
        )}
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
