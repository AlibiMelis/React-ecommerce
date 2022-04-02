import React, { Component } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

class ProductList extends Component {
  render() {
    const { products } = this.props;
    console.log(products);
    return (
      <main className="product-list-container">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </main>
    );
  }
}

export default ProductList;
