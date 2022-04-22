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
  currency: "",
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

const compareItems = (a, b) => {
  const sameProduct = a.product.id === b.product.id;
  const sameAttr = lodash.isEqual(a.attributes, b.attributes);
  return sameProduct && sameAttr;
};

export const changeCart = (state = initialCartState, action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const itemToAdd = state.items.find((i) => compareItems(i, action.payload));
      if (!itemToAdd) {
        return {
          ...state,
          items: [...state.items, { ...action.payload, qty: 1 }],
        };
      }
      return {
        ...state,
        items: state.items.map((i) => (compareItems(i, action.payload) ? { ...i, qty: i.qty + 1 } : i)),
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((i) => !compareItems(i, action.payload)),
      };

    case actionTypes.INCREMENT_ITEM_COUNT:
      const itemToInc = state.items.find((i) => lodash.isEqual(i, action.payload));
      if (!itemToInc) return state;
      return {
        ...state,
        items: state.items.map((i) => (lodash.isEqual(i, action.payload) ? { ...i, qty: i.qty + 1 } : i)),
      };

    case actionTypes.DECREMENT_ITEM_COUNT:
      const itemToDec = state.items.find((i) => lodash.isEqual(i, action.payload));
      if (!itemToDec || itemToDec.qty < 2) return state;
      return {
        ...state,
        items: state.items.map((i) => (lodash.isEqual(i, action.payload) ? { ...i, qty: i.qty - 1 } : i)),
      };

    case actionTypes.SET_ITEM_ATTRIBUTE:
      const itemToSet = state.items.find((i) => lodash.isEqual(i, action.payload.item));
      if (!itemToSet) return state;
      const attr = { ...itemToSet.attributes };
      attr[action.payload.attr] = action.payload.value;
      return {
        ...state,
        items: state.items.map((i) => (lodash.isEqual(i, action.payload.item) ? { ...i, attributes: attr } : i)),
      };

    default:
      return state;
  }
};
