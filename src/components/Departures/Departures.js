import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";

import WithCss from "layout/WithCss";
import Input from "components/Input";

import { SEARCH_STATION_BY_NAME } from "./Departures.schema";
import s from "./Departures.css";
import DeparturesTypes from "./Departures.propTypes";

class Departures extends Component {
  constructor() {
    super();
    this.state = { searchStation: "", stationsByName: [] };
  }
  onStationsFetched = stationsByName => this.setState({ stationsByName });

  render() {
    // console.log(this.props, " <-- this.props");
    // console.log(this.state, " <-- this.state");
    // const { data } = this.props;
    const { stationsByName } = this.state;

    return (
      <ApolloConsumer>
        {client => (
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
            <button
              onClick={async () => {
                const { data } = await client.query({
                  query: SEARCH_STATION_BY_NAME,
                  variables: { stationName: this.state.searchStation }
                });
                this.onStationsFetched(data.stationsByName);
              }}
            >
              Sök stationer
            </button>
            {stationsByName ? (
              <ul>
                {stationsByName.map((station, i) => (
                  <li key={i}>{station.name}</li>
                ))}
              </ul>
            ) : (
              <p>laddar</p>
            )}
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

Departures.propTypes = DeparturesTypes;

export default WithCss(Departures, s);
