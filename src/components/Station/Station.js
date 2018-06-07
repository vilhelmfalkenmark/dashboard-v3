import React from "react";
import WithCss from "hocs/WithCss";
import arrowRight from "images/svg/arrow-right.svg";
import heartOutlined from "images/svg/heart-outlined.svg";
import heartSolid from "images/svg/heart-solid.svg";
import Button from "components/Button";

import SVG from "components/SVG";

import s from "./Station.css";

const Station = ({
  station,
  saveStationAsFavorite,
  stationIsFavorite,
  newFavoriteStation,
  removeStationFromFavorites,
  pending,
  showDepartureList
}) => {
  return (
    <li className={s({ item: true })}>
      <div className={s({ left: true })}>
        <Button
          onClickCallback={
            stationIsFavorite
              ? () =>
                  removeStationFromFavorites({
                    name: station.name,
                    siteId: station.siteId
                  })
              : () =>
                  saveStationAsFavorite({
                    name: station.name,
                    siteId: station.siteId
                  })
          }
          icon={stationIsFavorite ? heartSolid : heartOutlined}
          className={s({ button: true })}
          iconClassName={s({
            heart: true,
            heart_solid: stationIsFavorite,
            heart_newFavoriteStation: newFavoriteStation
          })}
          circleButton
          // shadowButton
        />
      </div>
      <button
        className={s({ showDeparturesButton: true, button: true })}
        onClick={() =>
          showDepartureList({
            siteId: station.siteId,
            name: station.name,
            visible: true
          })
        }
      >
        <div className={s({ stationInfoContainer: true })}>
          <p className={s({ stationName: true })}>
            {station.name}
            {station.dist && (
              <span className={s({ stationDistance: true })}>
                Avstånd: {station.dist} meter
              </span>
            )}
          </p>
          {/* {station.siteId} */}
        </div>
        <div className={s({ rightSection: true })}>
          <span className={s({ showDepartureText: true })}>Visa avgångar</span>
          <SVG
            svg={arrowRight}
            className={s({
              arrowRight: true
            })}
          />
        </div>
      </button>
    </li>
  );
};

export default WithCss(Station, s);
