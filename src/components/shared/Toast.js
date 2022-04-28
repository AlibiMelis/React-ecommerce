import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ toasts: state.toast.toasts });
class Toast extends Component {
  render() {
    const { toasts } = this.props;
    return (
      <div className="toast-container">
        {toasts.map((t, ind) => (
          <div className={"toast " + (t.type || "")} key={ind}>
            {t.message}
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Toast);
