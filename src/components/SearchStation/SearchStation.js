import React, { Component } from "react";
import Input from "components/Input";
import StationList from "components/StationList";
import WithDepartureList from "components/WithDepartureList";

import { SEARCH_STATION_BY_NAME } from "utils/schemas/departures";

import WithCss from "layout/WithCss";
import s from "./SearchStation.css";

class SearchStation extends Component {
  constructor() {
    super();
    this.state = {
      searchStationQuery: "",
      stationsByName: [],
      newFavoriteStationSiteId: null
    };
    this.handleStationSearch = this.handleStationSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStationsFetched = this.onStationsFetched.bind(this);
    this.handleSaveStationsAsFavorite = this.handleSaveStationsAsFavorite.bind(
      this
    );
    this.handleRemoveStationFromFavorites = this.handleRemoveStationFromFavorites.bind(
      this
    );
  }

  handleStationSearch(value) {
    this.setState({
      searchStationQuery: value
    });
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

  handleSubmit() {
    const { client } = this.props;

    return (async () => {
      const { data } = await client.query({
        query: SEARCH_STATION_BY_NAME,
        variables: { name: this.state.searchStationQuery }
      });
      this.onStationsFetched(data.stationsByName);
    })();
  }

  onStationsFetched = stationsByName => this.setState({ stationsByName });

  render() {
    const { stationsByName, searchStationQuery } = this.state;
    return (
      <div
        className={s({
          container: true
        })}
      >
        <div className={s({ searchFieldContainer: true })}>
          <Input
            inputLabel="Sök station"
            inputPlaceholder="Exempelvis odenplan"
            inputName="searchStation"
            inputDisabled={false}
            inputValue={searchStationQuery}
            handleSubmit={this.handleSubmit}
            submitButtonText={"SÖK"}
            inputOnChange={value => this.handleStationSearch(value)}
          />
        </div>
        <StationList
          newFavoriteStationSiteId={this.props.newFavoriteStationSiteId}
          myFavoriteStations={this.props.myFavoriteStations}
          stations={stationsByName}
          saveStationAsFavorite={this.handleSaveStationsAsFavorite}
          removeStationFromFavorites={this.handleRemoveStationFromFavorites}
          showDepartureList={this.props.showDepartureList}
        />
      </div>
    );
  }
}

export default WithDepartureList(WithCss(SearchStation, s));
