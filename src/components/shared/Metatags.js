import React, { Component } from "react";
import Helmet from "react-helmet";

class Metatags extends Component {
  render() {
    const { title = "Wonderful Shop", description = "An online shopping website" } = this.props;
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
    );
  }
}

export default Metatags;
