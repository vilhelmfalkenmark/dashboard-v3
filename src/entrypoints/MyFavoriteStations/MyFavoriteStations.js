import React from "react";
import WithCss from "layout/WithCss";
import MyFavoriteStationsPresentation from "./MyFavoriteStationsPresentation";

import s from "./MyFavoriteStations.css";

const MyFavoriteStations = ({ client }) => (
  <main className={s({ container: true })}>
    <div className={s({ content: true })}>
      <div className={s({ overflow: true })}>
        <MyFavoriteStationsPresentation client={client} />
      </div>
    </div>
  </main>
);

export default WithCss(MyFavoriteStations, s);
