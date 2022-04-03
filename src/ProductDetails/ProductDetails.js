import React, { Component } from "react";
import { client } from "../App";
import { ProductDetailsQuery } from "../lib/queries";
import { withRouter } from "../lib/withRouter";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    const loadDetails = async (id) => {
      const product = await client.query({ query: ProductDetailsQuery(id) }).then(result => result.data);
    };

    loadDetails(this.props.params.id)
  }

  render() {
    const { id } = this.props.params;
    return (
      <main>
        <div>Product details page</div>
      </main>
    );
  }
}

export default withRouter(ProductDetails);
