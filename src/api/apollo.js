import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ProductListQuery, ProductDetailsQuery, CategoryListQuery, CurrencyListQuery } from "./apolloQueries";

const client = new ApolloClient({
  uri: "https://ecommerce-api-5u3i.onrender.com",
  cache: new InMemoryCache(),
});

export const getCategories = () => {
  return client.query({ query: CategoryListQuery }).then((result) => result.data);
};

export const getCurrencies = () => {
  return client.query({ query: CurrencyListQuery }).then((result) => result.data);
};

export const getProducts = (category) => {
  return client.query({ query: ProductListQuery(category) }).then((result) => result.data);
};

export const getProduct = (id) => {
  return client.query({ query: ProductDetailsQuery(id) }).then((result) => result.data);
};
