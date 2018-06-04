import { split } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";

const HTTP_END_POINT = process.env.HTTP_END_POINT || "http://localhost:5000";
const WS_END_POINT = process.env.WS_END_POINT || "ws://localhost:5000";
const cache = new InMemoryCache();

// Create an http link:
const httpLink = new HttpLink({
  uri: `${HTTP_END_POINT}/api`,
  useGETForQueries: true
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `${WS_END_POINT}/subscriptions`,
  options: {
    reconnect: true
  }
});

// Split depending on protocol
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache
});

export default client;
