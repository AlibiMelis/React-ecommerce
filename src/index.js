import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { shop, currency, cart } from "./redux/reducers";
import { createLogger } from "redux-logger";

const rootReducer = combineReducers({ shop, currency, cart });

let initialStore = {};
try {
  initialStore = sessionStorage.getItem("myApp") ? JSON.parse(sessionStorage.getItem("myApp")) : {};
} catch (e) {
  console.log('Session storage error', e);
}
const storeSaver = (store) => (next) => (action) => {
  const nextResult = next(action);
  const currentStore = store.getState();
  sessionStorage.setItem("myApp", JSON.stringify({...currentStore}));
  return nextResult;
}

const store = createStore(
  rootReducer,
  initialStore,
  applyMiddleware(thunkMiddleware, createLogger(), storeSaver)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
