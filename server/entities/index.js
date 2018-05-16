// import { PubSub, withFilter } from "graphql-subscriptions";
import { mergeDeepWith, concat } from "ramda";
import rootTypeDefs from "./rootTypeDefs";

import HTTPconnector from "../connector";
import endpoints from "../connector/endpoints";

// IMPORT ENTITIES
import sl from "./sl";

export default database => {
  const connector = HTTPconnector();

  // INITIALIZE ENTITIES

  // Statens Lokaltrafik
  const slEntity = sl({
    connector,
    endpoints: endpoints.sl,
    database
  });

  // All initialized entities should be listed in this array
  const entitiesArray = [slEntity];

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
