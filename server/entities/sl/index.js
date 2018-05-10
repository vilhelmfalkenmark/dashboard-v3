import Model from "./model";
import Resolvers from "./resolvers";
// import typeDefs from "./schema.graphql";

export default ({ connector, endpoints }) => {
  const model = Model({ connector, endpoints });

  return {
    resolvers: Resolvers({ model }),
    typeDefs: `type Person {
      id: Int!
      name: String
    }

    input personId {
      id: Int!
    }

    type Station {
      Name: String
      SiteId: String
      Type: String
      X: String
      Y: String
    }

    input stationNameQuery {
      stationName: String!
    }

    extend type Query {
      test(params: personId): Person
      searchStationByName(params: stationNameQuery): [Station]
    }`
  };
};
