import { getProducts } from "../lib/apolloClient";
import * as actionTypes from "./actionTypes";

// Request Products
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

// Change Currency
export const setCurrency = (currency) => ({
  type: actionTypes.SET_CURRENCY,
  payload: currency,
});

// Manipulate Cart
export const addToCart = (item) => ({
  type: actionTypes.ADD_TO_CART,
  payload: item,
});

export const incrementItemCount = (item) => ({
  type: actionTypes.INCREMENT_ITEM_COUNT,
  payload: item,
});

export const decrementItemCount = (item) => ({
  type: actionTypes.DECREMENT_ITEM_COUNT,
  payload: item,
});

export const setItemAttribute = (item, attr, value) => ({
  type: actionTypes.SET_ITEM_ATTRIBUTE,
  payload: { item, attr, value },
})

export const removeFromCart = (item) => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload: item,
})