import { is, lensPath, view } from "ramda";

const busesLens = lensPath(["departures", "buses"]);
const metrosLens = lensPath(["departures", "metros"]);
const trainsLens = lensPath(["departures", "trains"]);

export const stationIsAlreadyFavorite = ({ station, myFavoriteStations }) => {
  if (is(Array, myFavoriteStations)) {
    const len = myFavoriteStations.length;
    let i = 0;
    while (i < len) {
      if (myFavoriteStations[i].siteId === station.siteId) {
        return true;
      }
      i++;
    }
  }
  return false;
};

const defaultCoordinates = {
  lon: 18,
  lat: 59
};

export const pluckLongitudeAndLatitude = ({ position, type }) => {
  if (type === "lon") {
    return (
      view(lensPath(["coords", "longitude"]), position) ||
      defaultCoordinates.lon
    );
  } else if (type === "lat") {
    return (
      view(lensPath(["coords", "latitude"]), position) || defaultCoordinates.lat
    );
  }
  return null;
};

export const pluckDepartureType = ({ data, type }) => {
  if (type === "buses") {
    return view(busesLens, data);
  } else if (type === "metros") {
    return view(metrosLens, data);
  } else if (type === "trains") {
    return view(trainsLens, data);
  }
  return null;
};

export default stationIsAlreadyFavorite;
