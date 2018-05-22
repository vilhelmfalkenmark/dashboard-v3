import React from "react";
import Station from "components/Station";
import stationIsAlreadyFavorite from "utils/selectors/departures";

import WithCss from "layout/WithCss";
import s from "./StationList.css";

const StationList = ({
  stations,
  myFavoriteStationsContext, // If it is diplayed in the MyFavoritesStations context there is no need to check
  saveStationAsFavorite,
  removeStationFromFavorites,
  newFavoriteStationSiteId,
  myFavoriteStations,
  showDepartureList
}) => {
  if (!stations) {
    return null;
  }
  return (
    <div
      className={s({
        container: true
      })}
    >
      <ul className={s({ list: true })}>
        {stations.map((station, i) => (
          <Station
            station={station}
            newFavoriteStation={station.siteId === newFavoriteStationSiteId}
            stationIsFavorite={
              myFavoriteStationsContext ||
              stationIsAlreadyFavorite({
                station,
                myFavoriteStations
              })
            }
            showDepartureList={showDepartureList}
            key={i}
            saveStationAsFavorite={saveStationAsFavorite}
            removeStationFromFavorites={removeStationFromFavorites}
          />
        ))}
      </ul>
    </div>
  );
};

export default WithCss(StationList, s);
