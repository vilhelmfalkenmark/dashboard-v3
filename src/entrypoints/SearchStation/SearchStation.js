import React from "react";
import WithCss from "layout/WithCss";
import SearchStationPresentation from "./SearchStationPresentation";

import s from "./SearchStation.css";

const SearchStation = ({ client }) => (
  <main className={s({ container: true })}>
    <div className={s({ content: true })}>
      <div className={s({ overflow: true })}>
        <SearchStationPresentation client={client} />
      </div>
    </div>
  </main>
);

export default WithCss(SearchStation, s);
