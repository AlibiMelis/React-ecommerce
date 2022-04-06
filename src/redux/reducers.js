import * as actionTypes from "./actionTypes";

const initialProductsState = {
  products: [],
  isPending: true,
};

export const requestProducts = (state = initialProductsState, action = {}) => {
  switch (action.type) {
    case actionTypes.REQUEST_PRODUCTS_PENDING:
      return { ...state, isPending: true };
    case actionTypes.REQUEST_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.category.products,
        isPending: false,
      };
    case actionTypes.REQUEST_PRODUCTS_FAILED:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};

const initialCurrencyState = {
  currency: "$",
};

export const changeCurrency = (state = initialCurrencyState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_CURRENCY:
      return { ...state, currency: action.payload };
    default:
      return state;
  }
};

const initialCartState = {
  items: [],
};

export const changeCart = (state = initialCartState, action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // TODO: Need to check if inside the cart already
      return { ...state, items: [...state.items, {...action.payload, qty: 1}] };
    default:
      return state;
  }
};
