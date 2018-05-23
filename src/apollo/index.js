import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const API_END_POINT = process.env.API_END_POINT || "http://localhost:5000";
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${API_END_POINT}/api`,
    useGETForQueries: true
  }),
  cache
});

export default client;
