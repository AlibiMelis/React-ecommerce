import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";
import { addToCart, requestProducts } from "../../redux/actions";
import { getProduct } from "../../api/apolloClient";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

import { ReactComponent as CartIcon } from "../../assets/white-cart.svg";

import "./ProductList.css";
import Loader from "../Loader/Loader";

const mapStateToProps = (state) => ({
  isPending: state.requestProducts.isPending,
  products: state.requestProducts.products,
  currency: state.changeCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  onRequestProducts: (category) => dispatch(requestProducts(category)),
  addToCart: (product, attributes) => dispatch(addToCart({ product, attributes })),
});

class ProductList extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.onRequestProducts(category);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { category } = this.props.match.params;
      this.props.onRequestProducts(category);
      window.scrollTo(0, 0);
    }
  }

  onAddToCart = async (id) => {
    try {
      const { product } = await getProduct(id);
      const attributes = product.attributes.reduce((acc, attr) => {
        acc[attr.id] = attr.items[0].id;
        return acc;
      }, {});
      this.props.addToCart(product, attributes);
      toast.success("Added to your cart");
    } catch (e) {
      toast.error("Couldn't add this item to cart");
    }
  };

  render() {
    const { products, isPending, currency } = this.props;
    const { category } = this.props.match.params;

    return (
      <main>
        {!isPending ? (
          <>
            <Toaster position="bottom-right" />
            <div className="header category-header">{category}</div>
            <div className="product-list">
              {products.map((product) => (
                <div className="product" key={product.id}>
                  <Link to={`/shop/${product.category}/${product.id}`} className="link">
                    <ProductCard product={product} currency={currency} />
                  </Link>
                  {product.inStock && (
                    <div className="add-to-cart" onClick={() => this.onAddToCart(product.id)}>
                      <CartIcon />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <Loader show />
        )}
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
