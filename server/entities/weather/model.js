import { view, lensPath } from "ramda";

export default ({ connector, endpoints }) => {
  //////////////////////////////////////////////////
  /**
   * GET Weather data by geographical coordinates
   */
  //////////////////////////////////////////////////
  const getWeatherByCoordinates = ({ lon = 17.9, lat = 59.3 }) =>
    connector
      .getRequest({ path: endpoints.getWeatherByCoordinates({ lon, lat }) })
      .then(response => response);

  return {
    getWeatherByCoordinates
  };
};
