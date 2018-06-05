export default ({ model }) => ({
  Query: {
    /**
     * @function getWeatherByCoordinates
     *
     */
    getWeatherByCoordinates: (context, { params: { lon, lat } }) =>
      model.getWeatherByCoordinates({ lon, lat })
  }
});
