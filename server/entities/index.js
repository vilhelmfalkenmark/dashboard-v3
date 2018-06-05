// import { PubSub, withFilter } from "graphql-subscriptions";
import { mergeDeepWith, concat } from "ramda";
import rootTypeDefs from "./rootTypeDefs";
import { PubSub, withFilter } from "graphql-subscriptions";

import HTTPconnector from "../connector";
import endpoints from "../connector/endpoints";

// IMPORT ENTITIES
import Departures from "./departures";
import Weather from "./weather";
import Todos from "./todos";

export const pubsub = new PubSub();

export default database => {
  const connector = HTTPconnector();

  // INITIALIZE ENTITIES

  // Statens Lokaltrafik
  const departuresEntity = Departures({
    connector,
    endpoints: endpoints.sl,
    database
  });

  // Todolist
  const todosEntity = Todos({
    connector,
    database,
    pubsub,
    withFilter
  });

  // Weather
  const weatherEntity = Weather({
    connector,
    endpoints: endpoints.weather
  });

  // All initialized entities should be listed in this array
  const entitiesArray = [departuresEntity, todosEntity, weatherEntity];

  const combinedResolve = arr =>
    arr.reduce(
      (acc, { resolvers }) => mergeDeepWith(concat, acc, resolvers),
      {} // Initial value for reduce
    );

  const combinedTypeDefs = arr =>
    arr.reduce((acc, { typeDefs }) => acc.concat(typeDefs), [rootTypeDefs]);

  const rootSchema = arr => ({
    typeDefs: combinedTypeDefs(arr),
    resolvers: combinedResolve(arr)
  });

  return rootSchema(entitiesArray);
};
