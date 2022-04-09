import * as actionTypes from "./actionTypes";
import lodash from "lodash";

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
      const itemToAdd = state.items.find(
        (i) => i.product.id === action.payload.product.id
      );
      if (!itemToAdd) {
        return {
          ...state,
          items: [...state.items, { ...action.payload, qty: 1 }],
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === itemToAdd.product.id ? { ...i, qty: i.qty + 1 } : i
        ),
      };
    case actionTypes.INCREMENT_ITEM_COUNT:
      const itemToInc = state.items.find((i) =>
        lodash.isEqual(i, action.payload)
      );
      if (!itemToInc) return state;
      return {
        ...state,
        items: state.items.map((i) =>
          lodash.isEqual(i, action.payload) ? { ...i, qty: i.qty + 1 } : i
        ),
      };
    case actionTypes.DECREMENT_ITEM_COUNT:
      const itemToDec = state.items.find((i) =>
        lodash.isEqual(i, action.payload)
      );
      if (!itemToDec || itemToDec.qty < 2) return state;

      return {
        ...state,
        items: state.items.map((i) =>
          lodash.isEqual(i, action.payload) ? { ...i, qty: i.qty - 1 } : i
        ),
      };
    default:
      return state;
  }
};
