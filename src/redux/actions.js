import { getProducts } from "../api/apolloClient";
import * as actionTypes from "./actionTypes";

// Request Products
export const requestProducts = (category) => (dispatch) => {
  dispatch({ type: actionTypes.REQUEST_PRODUCTS_PENDING });
  getProducts(category)
    .then((data) => dispatch({ type: actionTypes.REQUEST_PRODUCTS_SUCCESS, payload: data }))
    .catch((error) => dispatch({ type: actionTypes.REQUEST_PRODUCTS_FAILED, payload: error }));
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

export const incrementItemCount = (itemId) => ({
  type: actionTypes.INCREMENT_ITEM_COUNT,
  payload: itemId,
});

export const decrementItemCount = (itemId) => ({
  type: actionTypes.DECREMENT_ITEM_COUNT,
  payload: itemId,
});

export const setItemAttribute = (itemId, newValue) => ({
  type: actionTypes.SET_ITEM_ATTRIBUTE,
  payload: { itemId, newValue },
});

export const removeFromCart = (itemId) => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload: itemId,
});
