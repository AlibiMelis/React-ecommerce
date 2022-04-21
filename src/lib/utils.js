export const priceToString = (price) => (price ? `${price.currency.symbol}${price.amount}` : "");

export const categoryFromLocation = () => window.location.pathname.split("/")[2];

export const calculateProductsTotal = (items, currency) => {
  return items.reduce((acc, item) => {
    return acc + item.product.prices.find((p) => p.currency.symbol === currency).amount * item.qty;
  }, 0);
};

export const findProductPrice = (product, currency) => product.prices.find((p) => p.currency.symbol === currency)