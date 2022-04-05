import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ProductListQuery } from "./queries";

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export const getProducts = (category) => {
  return client.query({ query: ProductListQuery(category) }).then(result => result.data);
};
