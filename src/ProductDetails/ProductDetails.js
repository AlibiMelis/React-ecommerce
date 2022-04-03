import React, { Component } from "react";
import { client } from "../App";
import { ProductDetailsQuery } from "../lib/queries";
import { withRouter } from "../lib/withRouter";
import ReactMarkdown from "react-markdown";
import "./ProductDetails.css";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      image: "",
    };
    this.setImage = this.setImage.bind(this);
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

  setImage(img) {
    this.setState({ image: img });
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
                  onClick={() => this.setImage(img)}
                >
                  <img src={img} alt={product.name} />
                </div>
              ))}
            </div>
            <div className="product-image">
              <img src={this.state.image} />
            </div>
            <div className="product-details">
              <div>{product.brand}</div>
              <div>{product.name}</div>
              <div>
                Price: <br />
                {`${product.prices[0].currency.symbol} ${product.prices[0].amount}`}
              </div>
              <button className="add-to-cart">add to cart</button>
              <div>
                <ReactMarkdown>{product.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }
}

export default withRouter(ProductDetails);
