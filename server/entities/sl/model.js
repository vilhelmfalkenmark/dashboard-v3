const DB_STATION_MODEL = {
  stationId: "",
  _id: null
};

export default ({ connector, endpoints, database }) => {
  const test = ({ token }) => ({ name: "Ville", id: 4 });
  /**
   * @function searchStationByName
   * @param {String} stationName
   */

  //////////////////////////////////////////////////
  /**
   * SEARCH STATION BY NAME FROM TRAFIC-LAB API
   */
  //////////////////////////////////////////////////
  const searchStationByName = ({ stationName }) =>
    connector
      .getRequest({ path: endpoints.searchStationByName(stationName) })
      .then(response => response.ResponseData);

  //////////////////////////////////////////////////
  /**
   * ADD FAVORITE STATION TO MONGODB
   */
  //////////////////////////////////////////////////
  const addFavoriteStation = ({ stationId }) => {
    console.log(stationId, " <-- stationId");

    const newStation = Object.assign({}, DB_STATION_MODEL, {
      stationId
    });

    database
      .collection("favorite_stations")
      .insertOne(newStation, (err, doc) => {
        if (err) {
          return err;
        }
        return { stationId };
      });
  };
  return {
    test,
    searchStationByName,
    addFavoriteStation
  };
};
