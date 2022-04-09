import React, { Component } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";
import { requestProducts } from "../redux/actions";
import { connect } from "react-redux";

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
    // console.log("Rendering a list", this.props.match.params);
    const { products } = this.props;
    // console.log(products);
    return !this.props.isPending ? (
      <main className="product-list-container">
        {products.length &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </main>
    ) : (
      <main>
        Products are loading
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
