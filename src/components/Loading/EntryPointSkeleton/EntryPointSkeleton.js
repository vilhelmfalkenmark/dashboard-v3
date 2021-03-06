import React from "react";
import WithCss from "layout/WithCss";

import s from "./EntryPointSkeleton.css";

const EntryPointSkeleton = () => (
  <main className={s({ container: true })}>
    <div className={s({ content: true })} />
  </main>
);

export default WithCss(EntryPointSkeleton, s);
