import React, { Component } from "react";

const toast = {};
toast.success = (message) => ({ type: "success", message });
toast.error = (message) => ({ type: "error", message });
export { toast };
class Toast extends Component {
  render() {
    const { toasts, position } = this.props;
    return (
      <div className="toast-container" data-position={position}>
        {toasts.map((t, ind) => (
          <div className={"toast " + t.type ?? ""} key={ind}>{t.message}</div>
        ))}
      </div>
    );
  }
}

export default Toast;
