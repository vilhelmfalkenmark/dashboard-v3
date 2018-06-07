import React, { Component } from "react";
import WithCss from "hocs/WithCss";
import RingSpinner from "components/Loading/RingSpinner";
import { pluckLongitudeAndLatitude } from "utils/selectors/departures";

import { Query } from "react-apollo";

import { GET_WEATHER_BY_COORDINATES } from "utils/schemas/weather";

import s from "./Weather.css";

class Weather extends Component {
  componentDidMount() {
    if (this.props.geoLocation === null) {
      this.props.getGeoLocation();
    }
  }

  render() {
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
      <main className={s({ container: true })}>
        <div className={s({ content: true })}>
          <Query
            query={GET_WEATHER_BY_COORDINATES}
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
            {({ data, error, loading }) => {
              if (loading) return <p>Laddar Väder</p>;
              if (error) return `Error!: ${error}`;
              return <p>Väder laddad!</p>;
            }}
          </Query>
        </div>
      </main>
    );
  }
}

export default WithCss(Weather, s);
