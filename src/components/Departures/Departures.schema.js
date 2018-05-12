import { graphql, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";
import Departures from "./Departures";

export const SEARCH_STATION_BY_NAME = gql`
  query searchStationByName($stationName: String!) {
    stationsByName: searchStationByName(params: { stationName: $stationName }) {
      name: Name
      id: SiteId
    }
  }
`;

// export default compose(
//   withApollo,
//   graphql(SEARCH_STATION_BY_NAME, {
//     options: () => ({
//       variables: {
//         stationName: "centralen"
//       }
//     })
//   })
// )(Departures);
