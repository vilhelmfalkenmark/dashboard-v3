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

    // const { client } = this.props;

    // return (async () => {
    //   await client.mutate({
    //     mutation: REMOVE_STATION_FROM_FAVORITES,
    //     variables: { siteId: siteId, name: name },
    //     update: (cache, { data: { removedStation } }) => {
    //       const { myFavoriteStations } = cache.readQuery({
    //         query: MY_FAVORITE_STATIONS
    //       });
    //       cache.writeQuery({
    //         query: MY_FAVORITE_STATIONS,
    //         data: {
    //           myFavoriteStations: myFavoriteStations.filter(station => {
    //             return (
    //               station.siteId !== removedStation.siteId &&
    //               station.name !== removedStation.name
    //             );
    //           })
    //         }
    //       });
    //     }
    //   });
    // })();
  }

  render() {
    return (
      <div
        className={s({
          container: true
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
