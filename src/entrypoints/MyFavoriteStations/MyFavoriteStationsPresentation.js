import React, { Component } from "react";
import WithCss from "layout/WithCss";
import StationList from "components/StationList";
import WithDepartureList from "components/WithDepartureList";

import s from "./MyFavoriteStations.css";

class MyFavoriteStations extends Component {
  constructor() {
    super();
    this.removeStationFromFavorites = this.removeStationFromFavorites.bind(
      this
    );
  }

  //////////////////////////////////////////////////
  /**
   * Async functions
   */
  //////////////////////////////////////////////////
  removeStationFromFavorites({ siteId, name }) {
    this.props.removeStationsAsFavorite({
      siteId,
      name,
      client: this.props.client
    });
  }

  render() {
    return (
      <div
        className={s({
          presentationContainer: true
        })}
      >
        <StationList
          myFavoriteStationsContext
          stations={this.props.myFavoriteStations}
          showDepartureList={this.props.showDepartureList}
          removeStationFromFavorites={this.removeStationFromFavorites}
        />
      </div>
    );
  }
}

export default WithDepartureList(WithCss(MyFavoriteStations, s));
