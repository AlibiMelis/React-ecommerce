import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, requestProducts } from "../../redux/actions";
import { getProduct } from "../../api/apollo";

import ProductCard from "./ProductCard";
import { Loader, Toast } from "../shared";
import { ReactComponent as CartIcon } from "../../assets/white-cart.svg";
import "./ProductList.css";
import { toast } from "../shared/Toast";

const mapStateToProps = (state) => ({
  isPending: state.shop.isPending,
  products: state.shop.products,
  currency: state.currency.value,
});
const mapDispatchToProps = { requestProducts, addToCart };

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { toasts: [] };
  }
  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.requestProducts(category);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { category } = this.props.match.params;
      this.props.requestProducts(category);
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

      const toasts = this.state.toasts;
      toasts.push(toast.error("Added to your cart"));
      this.setState({ toasts });
      setTimeout(() => {
        const toasts = this.state.toasts;
        toasts.shift();
        this.setState({ toasts });
      }, 3000)
      // toast.success("Added to your cart");
    } catch (e) {
      // toast.error("Couldn't add this item to cart");
    }
  };

  render() {
    const { products, isPending, currency } = this.props;
    const { toasts } = this.state;
    const { category } = this.props.match.params;

    return (
      <main>
        <Toast toasts={toasts} position="top-center" />
        <div className="header category-header">{category}</div>
        {!isPending ? (
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
        ) : (
          <Loader center />
        )}
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
