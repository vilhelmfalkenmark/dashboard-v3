import React, { Component } from "react";
import { Query } from "react-apollo";
import WithCss from "layout/WithCss";
import DepartureListByTransport from "components/DepartureListByTransport";
import arrowLeft from "images/svg/arrow-left.svg";

import SVG from "components/SVG";

import { isNonEmptyArray } from "utils/helpers/array";
import { pluckDepartureType } from "utils/selectors/departures";

import { GET_DEPARTURES_BY_STATION_ID } from "utils/schemas/departures";

import s from "./DepartureList.css";

class DepartureList extends Component {
  constructor() {
    super();
    this.state = {
      timeWindow: 60
    };

    this.getMarkUp = this.getMarkUp.bind(this);
  }

  getMarkUp({ data, loading, error, fetchMoreDepartures }) {
    if (loading && !error) {
      return <p>Laddar i DepartureList</p>;
    } else if (error) {
      return <p>`Error!: ${error}`</p>;
    } else {
      const buses = pluckDepartureType({ data, type: "buses" });
      const trains = pluckDepartureType({ data, type: "trains" });
      const metros = pluckDepartureType({ data, type: "metros" });

      if (!buses && !metros && !trains) {
        return <p>Inga avgångar</p>;
      }
      return (
        <div>
          {isNonEmptyArray(buses) && (
            <DepartureListByTransport
              fetchMoreDepartures={fetchMoreDepartures}
              departures={buses}
              type={"bus"}
              title={"Bussar"}
            />
          )}
          {isNonEmptyArray(metros) && (
            <DepartureListByTransport
              fetchMoreDepartures={fetchMoreDepartures}
              departures={metros}
              type={"metro"}
              title={"Tunnelbana"}
            />
          )}
          {isNonEmptyArray(trains) && (
            <DepartureListByTransport
              fetchMoreDepartures={fetchMoreDepartures}
              departures={trains}
              type={"train"}
              title={"Pendeltåg"}
            />
          )}
        </div>
      );
    }
  }

  // Prepped for pagination. However SLs api only supports 60 min timeWindow
  // at most so kind of pointless right now
  fetchMoreDepartures({ fetchMore, data }) {
    return fetchMore({
      variables: {
        timeWindow: this.state.timeWindow + 10,
        siteId: this.props.siteId
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        this.setState({
          timeWindow: this.state.timeWindow + 10
        });

        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          data: [...data.departures, ...fetchMoreResult.departures]
        });
      }
    });
  }

  render() {
    return (
      <Query
        query={GET_DEPARTURES_BY_STATION_ID}
        variables={{
          siteId: this.props.siteId,
          timeWindow: this.state.timeWindow
        }}
        skip={!this.props.siteId}
        pollInterval={30000}
      >
        {({ data, error, loading, fetchMore }) => {
          return (
            <div className={s({ container: true })}>
              <header className={s({ header: true })}>
                <button
                  onClick={this.props.goBack}
                  className={s({ goBackButton: true })}
                >
                  <SVG
                    svg={arrowLeft}
                    className={s({
                      arrowLeft: true
                    })}
                  />
                  <span>Tillbaka</span>
                </button>
                <h3 className={s({ stationName: true })}>{this.props.name}</h3>
              </header>
              {this.getMarkUp({
                data,
                loading,
                error,
                fetchMoreDepartures: () =>
                  this.fetchMoreDepartures({
                    data,
                    fetchMore
                  })
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default WithCss(DepartureList, s);
