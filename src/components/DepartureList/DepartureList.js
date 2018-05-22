import React from "react";
import { Query } from "react-apollo";
import WithCss from "layout/WithCss";
import DepartureListByTransport from "components/DepartureListByTransport";
import arrowLeft from "images/svg/arrow-left.svg";

import SVG from "components/SVG";

import { isNonEmptyArray } from "utils/helpers/array";
import { pluckDepartureType } from "utils/selectors/departures";

import { GET_DEPARTURES_BY_STATION_ID } from "utils/schemas/departures";

import s from "./DepartureList.css";

const DepartureList = ({ siteId, name, goBack }) => {
  const getMarkUp = ({ data, loading, error }) => {
    if (loading) {
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
              departures={buses}
              type={"bus"}
              title={"Bussar"}
            />
          )}
          {isNonEmptyArray(metros) && (
            <DepartureListByTransport
              departures={metros}
              type={"metro"}
              title={"Tunnelbana"}
            />
          )}
          {isNonEmptyArray(trains) && (
            <DepartureListByTransport
              departures={trains}
              type={"train"}
              title={"Pendeltåg"}
            />
          )}
        </div>
      );
    }
  };

  return (
    <Query
      query={GET_DEPARTURES_BY_STATION_ID}
      variables={{ siteId }}
      skip={!siteId}
      pollInterval={30000}
    >
      {({ data, error, loading, refetch }) => {
        return (
          <div className={s({ container: true })}>
            <header className={s({ header: true })}>
              <button onClick={goBack} className={s({ goBackButton: true })}>
                <SVG
                  svg={arrowLeft}
                  className={s({
                    arrowLeft: true
                  })}
                />
                <span>Tillbaka</span>
              </button>
              <h3 className={s({ stationName: true })}>{name}</h3>
            </header>
            {getMarkUp({ data, loading, error })}
          </div>
        );
      }}
    </Query>
  );
};

export default WithCss(DepartureList, s);
