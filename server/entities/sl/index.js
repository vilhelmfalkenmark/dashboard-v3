import Model from "./model";
import Resolvers from "./resolvers";
// import typeDefs from "./schema.graphql";

export default ({ connector, endpoints, database }) => {
  const model = Model({ connector, endpoints, database });

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

    type StationId {
      stationId: String
    }

    input stationNameQuery {
      stationName: String!
    }

    input stationIdMutation {
      stationId: String!
    }

    extend type Mutation {
      addFavoriteStation(params: stationIdMutation): StationId
    }

    extend type Query {
      test(params: personId): Person
      searchStationByName(params: stationNameQuery): [Station]
    }`
  };
};
