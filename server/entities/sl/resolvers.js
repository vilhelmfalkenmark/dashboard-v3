export default ({ model }) => ({
  Query: {
    test: (context, { params: { id } }) => model.test(id),
    searchStationByName: (context, { params: { stationName } }) =>
      model.searchStationByName({ stationName })
  },
  Mutation: {
    addFavoriteStation: (context, { params: { stationId } }) =>
      model.addFavoriteStation({ stationId })
  }
});
