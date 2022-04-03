import React, { Component } from "react";
import { client } from "../App";
import { ProductDetailsQuery } from "../lib/queries";
import { withRouter } from "../lib/withRouter";
import "./ProductDetails.css";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      image: "",
    };
  }

  componentDidMount() {
    const loadDetails = async (id) => {
      const { product } = await client
        .query({ query: ProductDetailsQuery(id) })
        .then((result) => result.data);
      this.setState({ product, image: product.gallery[0] });
    };

    loadDetails(this.props.params.id);
  }

  render() {
    const { product } = this.state;
    return (
      <main>
        {this.state.product && (
          <div className="product-container">
            <div className="product-gallery">
              {product.gallery.map((img, ind) => (
                <div
                  className="product-gallery-image"
                  key={`image${ind}`}
                  onClick={() => this.setState({image: img})}
                >
                  <img src={img} alt={product.name} />
                </div>
              ))}
            </div>
            <div className="product-image">
              <img src={this.state.image} />
            </div>
            <div className="product-details">
              <div className="big-text semibold-text">{product.brand}</div>
              <div className="big-text name">{product.name}</div>
              <div className="bold-text uppercase">
                <span className="price-label">Price:</span>
                <div className="price">{`${product.prices[0].currency.symbol} ${product.prices[0].amount}`}</div>
              </div>
              <button className="add-to-cart uppercase">add to cart</button>
              <div className="description" dangerouslySetInnerHTML={{__html: product.description}} />
            </div>
          </div>
        )}
      </main>
    );
  }
}

export default withRouter(ProductDetails);
