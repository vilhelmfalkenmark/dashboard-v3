import React from "react";

const SVG = ({ svg, className }) => (
  <svg className={className} viewBox={svg.viewBox}>
    <use xlinkHref={`#${svg.id}`} />
  </svg>
);

export default SVG;
