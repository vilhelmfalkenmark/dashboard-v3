import React from "react";
import withCss from "hoc/WithCss";
import s from "./Root.css";

export const RootComponent = ({ children }) => (
  <div className={s.container}>{children}</div>
);

export default withCss(RootComponent, s);
