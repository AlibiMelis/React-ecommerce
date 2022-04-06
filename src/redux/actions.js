import { getProducts } from "../lib/apolloClient";
import * as actionTypes from "./actionTypes";

export const requestProducts = (category) => (dispatch) => {
  dispatch({ type: actionTypes.REQUEST_PRODUCTS_PENDING });
  getProducts(category)
    .then((data) =>
      dispatch({ type: actionTypes.REQUEST_PRODUCTS_SUCCESS, payload: data })
    )
    .catch((error) =>
      dispatch({ type: actionTypes.REQUEST_PRODUCTS_FAILED, payload: error })
    );
};

export const setCurrency = (currency) => ({
  type: actionTypes.SET_CURRENCY,
  payload: currency,
});

export const addToCart = (item) => ({
  type: actionTypes.ADD_TO_CART,
  payload: item,
});
