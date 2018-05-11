import React, { Component } from "react";

import WithCss from "layout/WithCss";
import Input from "components/Input";

import { SEARCH_STATION_BY_NAME } from "./Departures.schema";
import s from "./Departures.css";
import DeparturesTypes from "./Departures.propTypes";

class Departures extends Component {
  constructor() {
    super();

    this.state = {
      searchStation: ""
    };

    this.searchStationByName = this.searchStationByName.bind(this);
  }

  searchStationByName() {
    // this.props.client.query({
    //   query: SEARCH_STATION_BY_NAME,
    //   variables: {
    //     stationNameQuery: "Odenplan"
    //   }
    // });
  }

  render() {
    console.log(this.props, " <-- this.props");
    const { data } = this.props;

    return (
      <div className={s({ container: true })}>
        <h2 className={s({ heading: true })}>Avgångar</h2>
        <Input
          inputLabel="Sök station"
          inputPlaceholder="Exempelvis odenplan"
          inputName="searchStation"
          inputDisabled={false}
          inputValue={this.state.searchStation}
          inputOnChange={value =>
            this.setState({
              searchStation: value
            })
          }
        />
        <button onClick={this.searchStationByName}>Sök stationer</button>
        {!data.loading && data.stationsByName ? (
          <ul>
            {data.stationsByName.map((station, i) => (
              <li key={i}>{station.name}</li>
            ))}
          </ul>
        ) : (
          <p>laddar</p>
        )}
      </div>
    );
  }
}

Departures.propTypes = DeparturesTypes;

export default WithCss(Departures, s);
