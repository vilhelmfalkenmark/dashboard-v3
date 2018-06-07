import React, { Component } from "react";
import DepartureList from "components/DepartureList";
import { Query } from "react-apollo";
import {
  MY_FAVORITE_STATIONS,
  REMOVE_STATION_FROM_FAVORITES,
  SAVE_STATION_AS_FAVORITE
} from "utils/schemas/departures";

const WithDepartureList = (WrappedComponent, client) => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        showDepartureList: {
          visible: false,
          siteId: "",
          name: null
        },
        newFavoriteStationSiteId: null
      };
      this.showDepartureList = this.showDepartureList.bind(this);
      this.handleSaveStationsAsFavorite = this.handleSaveStationsAsFavorite.bind(
        this
      );
      this.handleRemoveStationFromFavorites = this.handleRemoveStationFromFavorites.bind(
        this
      );
    }

    showDepartureList({ siteId, name, visible }) {
      this.setState({
        showDepartureList: Object.assign({}, this.state.showDepartures, {
          siteId,
          name: name || this.state.showDepartureList.name,
          visible
        })
      });
    }

    //////////////////////////////////////////////////
    /**
     * Async functions
     */
    //////////////////////////////////////////////////
    handleSaveStationsAsFavorite({ name, siteId, client }) {
      return (async () => {
        await client.mutate({
          mutation: SAVE_STATION_AS_FAVORITE,
          variables: { name: name, siteId: siteId },
          update: (cache, { data: { newFavoriteStation } }) => {
            const { myFavoriteStations } = cache.readQuery({
              query: MY_FAVORITE_STATIONS
            });
            cache.writeQuery({
              query: MY_FAVORITE_STATIONS,
              data: {
                myFavoriteStations: myFavoriteStations.concat([
                  newFavoriteStation
                ])
              }
            });
          }
        });

        this.setState({
          newFavoriteStationSiteId: siteId
        });
      })();
    }

    handleRemoveStationFromFavorites = ({ siteId, name, client }) => {
      return (async () => {
        await client.mutate({
          mutation: REMOVE_STATION_FROM_FAVORITES,
          variables: { siteId: siteId, name: name },
          update: (cache, { data: { removedStation } }) => {
            const { myFavoriteStations } = cache.readQuery({
              query: MY_FAVORITE_STATIONS
            });
            cache.writeQuery({
              query: MY_FAVORITE_STATIONS,
              data: {
                myFavoriteStations: myFavoriteStations.filter(station => {
                  return (
                    station.siteId !== removedStation.siteId &&
                    station.name !== removedStation.name
                  );
                })
              }
            });
          }
        });
      })();
    };

    render() {
      const { showDepartureList } = this.state;

      return (
        <Query query={MY_FAVORITE_STATIONS}>
          {({ data, error, loading, refetch }) => {
            if (loading) return <p>Laddar</p>;
            if (error) return `Error!: ${error}`;
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  minWidth: "100%",
                  transition: "transform 0.4s",
                  alignItems: "flex-start",
                  transform: showDepartureList.visible
                    ? "translateX(-100%)"
                    : "translateX(0)"
                }}
              >
                <div style={{ minWidth: "100%" }}>
                  <WrappedComponent
                    {...this.props}
                    myFavoriteStations={data.myFavoriteStations}
                    saveStationsAsFavorite={this.handleSaveStationsAsFavorite}
                    removeStationsAsFavorite={
                      this.handleRemoveStationFromFavorites
                    }
                    showDepartureList={this.showDepartureList}
                    newFavoriteStationSiteId={
                      this.state.newFavoriteStationSiteId
                    }
                  />
                </div>
                <div style={{ minWidth: "100%" }}>
                  <DepartureList
                    siteId={showDepartureList.siteId}
                    name={showDepartureList.name}
                    goBack={() =>
                      this.showDepartureList({
                        siteId: "",
                        visible: false
                      })
                    }
                  />
                </div>
              </div>
            );
          }}
        </Query>
      );
    }
  };
};

export default WithDepartureList;
