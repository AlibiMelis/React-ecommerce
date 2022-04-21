import React, { Component } from "react";
import { requestProducts } from "../redux/actions";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";

import "./ProductList.css";
import Loader from "../Loader";

const mapStateToProps = (state) => ({
  isPending: state.requestProducts.isPending,
  products: state.requestProducts.products,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestProducts: (category) => dispatch(requestProducts(category)),
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

  render() {
    const { products, isPending } = this.props;
    const { category } = this.props.match.params;

    return (
      <main>
        {!isPending ? (
          <>
            <div className="header category-header">{category}</div>
            <div className="product-list">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
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
