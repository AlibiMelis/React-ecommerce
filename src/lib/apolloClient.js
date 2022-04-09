import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ProductListQuery, ProductDetailsQuery } from "./queries";

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export const getProducts = (category) => {
  return client
    .query({ query: ProductListQuery(category) })
    .then((result) => result.data);
};

export const getProduct = (id) => {
  return client
    .query({ query: ProductDetailsQuery(id) })
    .then((result) => result.data);
};
