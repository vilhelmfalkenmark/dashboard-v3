import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const API_END_POINT = process.env.API_END_POINT;

const client = new ApolloClient({
  link: createHttpLink({
    uri: `${API_END_POINT}/api`,
    useGETForQueries: true
  }),
  cache: new InMemoryCache()
});

export default client;
