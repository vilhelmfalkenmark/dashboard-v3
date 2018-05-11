import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:5000/api",
    useGETForQueries: true
  }),
  cache: new InMemoryCache()
});

export default client;
