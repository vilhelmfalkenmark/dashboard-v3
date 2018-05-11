import { graphql, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";
import Departures from "./Departures";

export const SEARCH_STATION_BY_NAME = gql`
  query searchStationByName($stationNameQuery: String!) {
    stationsByName: searchStationByName(
      params: { stationName: $stationNameQuery }
    ) {
      name: Name
      id: SiteId
    }
  }
`;

export default compose(
  withApollo,
  graphql(SEARCH_STATION_BY_NAME, {
    options: () => ({
      variables: {
        stationNameQuery: "centralen"
      }
    })
  })
)(Departures);
