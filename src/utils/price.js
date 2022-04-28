export const priceToString = (price) => (price ? `${price.currency.symbol}${price.amount}` : "");

export const findProductPrice = (product, currency) =>
  product.prices.find((p) => p.currency.symbol === currency) || product.prices[0];

export const calculateProductsTotal = (items, currency) =>
  items.reduce((acc, item) => {
    return acc + item.product.prices.find((p) => p.currency.symbol === currency).amount * item.qty;
  }, 0);
