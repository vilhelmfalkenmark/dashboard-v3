import React from "react";
import WithCss from "layout/WithCss";
import Departures from "entrypoints/Departures";
import s from "./Root.css";

export const RootComponent = () => (
  <div className={s({ container: true })}>
    <main className={s({ grid: true })}>
      <Departures />
    </main>
  </div>
);

export default WithCss(RootComponent, s);
