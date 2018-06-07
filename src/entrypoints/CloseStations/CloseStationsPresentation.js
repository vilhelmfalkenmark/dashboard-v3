import React, { Component } from "react";
import { Query } from "react-apollo";
import StationList from "components/StationList";
import WithDepartureList from "hocs/WithDepartureList";
import RingSpinner from "components/Loading/RingSpinner";
import { pluckLongitudeAndLatitude } from "utils/selectors/departures";

import { SEARCH_STATIONS_BY_COORDINATES } from "utils/schemas/departures";

import WithCss from "hocs/WithCss";
import s from "./CloseStations.css";

class CloseStationsPresentation extends Component {
  constructor(props) {
    super(props);

    this.handleSaveStationsAsFavorite = this.handleSaveStationsAsFavorite.bind(
      this
    );
    this.handleRemoveStationFromFavorites = this.handleRemoveStationFromFavorites.bind(
      this
    );
  }

  componentDidMount() {
    if (this.props.geoLocation === null) {
      this.props.getGeoLocation();
    }
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
    const { showDepartureList } = this.props;
    const { geoLocation } = this.props;

    if (!geoLocation) {
      return (
        <RingSpinner
          text={"Laddar din plats"}
          className={s({ spinner: true })}
        />
      );
    }

    return (
      <Query
        query={SEARCH_STATIONS_BY_COORDINATES}
        variables={{
          lon: pluckLongitudeAndLatitude({
            position: geoLocation,
            type: "lon"
          }),
          lat: pluckLongitudeAndLatitude({
            position: geoLocation,
            type: "lat"
          })
        }}
      >
        {({ data, error, loading, refetch }) => {
          if (loading)
            return (
              <RingSpinner
                text={"Laddar nära avgångar"}
                className={s({ spinner: true })}
              />
            );
          if (error) return `Error!: ${error}`;
          return (
            <StationList
              newFavoriteStationSiteId={this.props.newFavoriteStationSiteId}
              myFavoriteStations={this.props.myFavoriteStations}
              stations={data.stationsByCoordinates}
              saveStationAsFavorite={this.handleSaveStationsAsFavorite}
              removeStationFromFavorites={this.handleRemoveStationFromFavorites}
              showDepartureList={showDepartureList}
            />
          );
        }}
      </Query>
    );
  }
}

export default WithDepartureList(WithCss(CloseStationsPresentation, s));
