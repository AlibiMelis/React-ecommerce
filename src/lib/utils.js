export const priceToString = (price) => price ? `${price.currency.symbol}${price.amount}` : "";
