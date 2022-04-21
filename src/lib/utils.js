export const priceToString = (price) => price ? `${price.currency.symbol}${price.amount}` : "";
export const categoryFromLocation = () => window.location.pathname.split("/")[2];
