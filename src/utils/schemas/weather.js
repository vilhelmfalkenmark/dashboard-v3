import gql from "graphql-tag";

export const GET_WEATHER_BY_COORDINATES = gql`
  query getWeatherByCoordinates($lon: Float!, $lat: Float!) {
    weatherByCoordinates: getWeatherByCoordinates(
      params: { lon: $lon, lat: $lat }
    ) {
      city {
        name
      }
    }
  }
`;
