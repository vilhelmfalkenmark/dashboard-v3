import React from "react";
import WithCss from "hocs/WithCss";
import CloseStationsPresentation from "./CloseStationsPresentation";

import s from "./CloseStations.css";

const CloseStations = ({ client, getGeoLocation, geoLocation }) => (
  <main className={s({ container: true })}>
    <div className={s({ content: true })}>
      <div className={s({ overflow: true })}>
        <CloseStationsPresentation
          client={client}
          getGeoLocation={getGeoLocation}
          geoLocation={geoLocation}
        />
      </div>
    </div>
  </main>
);

export default WithCss(CloseStations, s);
