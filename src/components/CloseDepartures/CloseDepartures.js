import React, { Component } from "react";
import { Query } from "react-apollo";
import StationList from "components/StationList";
import WithDepartureList from "components/WithDepartureList";
import { pluckLongitudeAndLatitude } from "utils/selectors/departures";

import { SEARCH_STATIONS_BY_COORDINATES } from "utils/schemas/departures";

import WithCss from "layout/WithCss";
import s from "./CloseDepartures.css";

class CloseDepartures extends Component {
  constructor() {
    super();

    this.handleSaveStationsAsFavorite = this.handleSaveStationsAsFavorite.bind(
      this
    );
    this.handleRemoveStationFromFavorites = this.handleRemoveStationFromFavorites.bind(
      this
    );
  }
  handleSaveStationsAsFavorite({ name, siteId }) {
    this.props.saveStationsAsFavorite({
      siteId,
      name,
      client: this.props.client
    });
  }

  handleRemoveStationFromFavorites = ({ siteId, name }) => {
    this.props.removeStationsAsFavorite({
      siteId,
      name,
      client: this.props.client
    });
  };

  render() {
    const { position, showDepartureList } = this.props;
    if (!position) {
      return <p>Laddar kordinater</p>;
    }

    return (
      <Query
        query={SEARCH_STATIONS_BY_COORDINATES}
        variables={{
          lon: pluckLongitudeAndLatitude({
            position,
            type: "lon"
          }),
          lat: pluckLongitudeAndLatitude({
            position,
            type: "lat"
          })
        }}
      >
        {({ data, error, loading, refetch }) => {
          if (loading) return <p>Laddar</p>;
          if (error) return `Error!: ${error}`;
          return (
            <div
              className={s({
                container: true
              })}
            >
              <StationList
                newFavoriteStationSiteId={this.props.newFavoriteStationSiteId}
                myFavoriteStations={this.props.myFavoriteStations}
                stations={data.stationsByCoordinates}
                saveStationAsFavorite={this.handleSaveStationsAsFavorite}
                removeStationFromFavorites={
                  this.handleRemoveStationFromFavorites
                }
                showDepartureList={showDepartureList}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default WithDepartureList(WithCss(CloseDepartures, s));
