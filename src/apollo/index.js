import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";

const API_END_POINT = process.env.API_END_POINT;
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${API_END_POINT}/api`,
    useGETForQueries: true
  }),
  cache
});

export default client;
