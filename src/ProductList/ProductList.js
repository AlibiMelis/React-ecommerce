import React, { Component } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

class ProductList extends Component {
  render() {
    const { products, selectedCur } = this.props;
    console.log(products);
    return (
      <main className="product-list-container">
        {products.length && products.map((product) => (
          <ProductCard product={product} key={product.id} selectedCur={selectedCur} />
        ))}
      </main>
    );
  }
}

export default ProductList;
