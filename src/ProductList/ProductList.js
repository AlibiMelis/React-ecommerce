import React, { Component } from "react";
import './ProductList.css'

class ProductList extends Component {
  render() {
    const { products } = this.props;
    console.log(products);
    return (
      <main className="product-list-container">
        
      </main>
    );
  }
}

export default ProductList;
