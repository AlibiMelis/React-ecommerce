
import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { shop, currency, cart, toast } from "./reducers";

let initialStore = {};
try {
  initialStore = sessionStorage.getItem("myApp") ? JSON.parse(sessionStorage.getItem("myApp")) : {};
  initialStore.toast.toasts = [];
} catch (e) {
  console.log("Session storage error", e);
}
const storeSaver = (store) => (next) => (action) => {
  const nextResult = next(action);
  const currentStore = store.getState();
  sessionStorage.setItem("myApp", JSON.stringify({ ...currentStore }));
  return nextResult;
};

const rootReducer = combineReducers({ shop, currency, cart, toast });

export const store = createStore(
  rootReducer,
  initialStore,
  applyMiddleware(thunkMiddleware, storeSaver)
);
