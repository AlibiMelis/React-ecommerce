import React, { Component } from "react";
import { requestProducts } from "../redux/actions";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";
import { addToCart } from "../redux/actions";
import { getProduct } from "../lib/apolloClient";
import toast, { Toaster } from "react-hot-toast";

import "./ProductList.css";
import Loader from "../Loader";

const mapStateToProps = (state) => ({
  isPending: state.requestProducts.isPending,
  products: state.requestProducts.products,
});
const mapDispatchToProps = (dispatch) => ({
  onRequestProducts: (category) => dispatch(requestProducts(category)),
  addToCart: (product, attributes) => dispatch(addToCart({ product, attributes })),
});

class ProductList extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.onRequestProducts(category);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { category } = this.props.match.params;
      this.props.onRequestProducts(category);
    }
  }

  onAddToCart = async (id) => {
    const { product } = await getProduct(id);
    const attributes = product.attributes.reduce((acc, attr) => {
      acc[attr.id] = attr.items[0].id;
      return acc;
    }, {});
    this.props.addToCart(product, attributes);
    toast.success("Added to your cart");
  };

  render() {
    const { products, isPending } = this.props;
    const { category } = this.props.match.params;

    return (
      <main>
        {!isPending ? (
          <>
            <Toaster position="bottom-right" />
            <div className="header category-header">{category}</div>
            <div className="product-list">
              {products.map((product) => (
                <ProductCard product={product} onAddToCart={() => this.onAddToCart(product.id)} key={product.id} />
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
