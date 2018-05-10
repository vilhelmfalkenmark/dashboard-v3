export default {
  sl: {
    // realTime:
    //   "http://api.sl.se/api2/realtimedeparturesv4.json?key=152b19caf669418c88b48ce2c2ba0cee",
    searchStationByName: stationNameQuery =>
      `http://api.sl.se/api2/typeahead.json?key=e1a91d0e65ab4ffbbc3fbd7425677d8c&searchstring=${stationNameQuery.replace(
        /\s/g,
        "%20"
      )}&stationsonly=true`
  }
};
