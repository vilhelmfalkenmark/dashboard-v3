import React from "react";
import WithCss from "layout/WithCss";
import Departures from "components/Departures";
import s from "./Root.css";

export const RootComponent = () => (
  <div className={s({ container: true })}>
    <h1>Första commiten</h1>
    <p className={s({ text: true })}>Första commiten</p>
    <Departures />
  </div>
);

export default WithCss(RootComponent, s);
