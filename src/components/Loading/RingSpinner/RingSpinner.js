import React from "react";
import WithCss from "hocs/WithCss";

import s from "./RingSpinner.css";

const RingSpinner = ({ className, text }) => (
  <div className={s({ container: true, [className]: className })}>
    <figure className={s({ spinnerContainer: true })}>
      <div className={s({ circle: true, circle_first: true })} />
      <div className={s({ circle: true, circle_second: true })} />
      <div className={s({ circle: true, circle_third: true })} />
    </figure>
    {text && <p>{text}</p>}
  </div>
);

export default WithCss(RingSpinner, s);
