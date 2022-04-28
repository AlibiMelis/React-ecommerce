import * as actionTypes from "./actionTypes";
import lodash from "lodash";

// SHOP REDUCER
const initialShopState = {
  products: [],
  isPending: false,
};

export const shop = (state = initialShopState, action = {}) => {
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

// CURRENCY REDUCER
const initialCurrencyState = { value: null };

export const currency = (state = initialCurrencyState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_CURRENCY:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

// CART REDUCER
const initialCartState = { items: [] };
const compareItems = (a, b) => {
  const sameProduct = a.product.id === b.product.id;
  const sameAttr = lodash.isEqual(a.attributes, b.attributes);
  return sameProduct && sameAttr;
};

export const cart = (state = initialCartState, action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const similarItem = state.items.find((i) => compareItems(i, action.payload));
      if (!similarItem) {
        return {
          ...state,
          items: [...state.items, { ...action.payload, id: Date.now(), qty: 1 }],
        };
      }
      return {
        ...state,
        items: state.items.map((i) => (i.id === similarItem.id ? { ...i, qty: i.qty + 1 } : i)),
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    case actionTypes.INCREMENT_ITEM_COUNT:
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.payload ? { ...i, qty: i.qty + 1 } : i)),
      };

    case actionTypes.DECREMENT_ITEM_COUNT:
      if (state.items.find((i) => i.id === action.payload)?.qty === 1) return state;
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.payload ? { ...i, qty: i.qty - 1 } : i)),
      };

    case actionTypes.SET_ITEM_ATTRIBUTE:
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.itemId ? { ...i, attributes: { ...i.attributes, ...action.payload.attributes } } : i
        ),
      };

    default:
      return state;
  }
};

// TOAST REDUCER
const initialToastState = { toasts: [] };
export const toast = (state = initialToastState, action = {}) => {
  switch (action.type) {
    case actionTypes.SHOW_TOAST:
      return { ...state, toasts: [action.payload, ...state.toasts] };
    case actionTypes.EXPIRE_TOAST:
      return { ...state, toasts: state.toasts.slice(0, state.toasts.length - 1) };
    default:
      return state;
  }
};
