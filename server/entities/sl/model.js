export default ({ connector, endpoints }) => {
  const test = ({ token }) => ({ name: "Ville", id: 4 });
  /**
   * @function searchStationByName
   * @param {String} stationName
   */

  const searchStationByName = ({ stationName }) =>
    connector
      .getRequest({ path: endpoints.searchStationByName(stationName) })
      .then(response => response.ResponseData);

  return {
    test,
    searchStationByName
  };
};
