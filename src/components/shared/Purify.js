import React, { Component } from "react";
import { sanitize } from "dompurify";

class Purify extends Component {
  render() {
    const { content, className } = this.props;
    return <div className={className} dangerouslySetInnerHTML={{__html: sanitize(content)}}></div>;
  }
}

export default Purify;
