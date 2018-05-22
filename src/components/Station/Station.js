import React from "react";
import WithCss from "layout/WithCss";
import arrowRight from "images/svg/arrow-right.svg";
import heartOutlined from "images/svg/heart-outlined.svg";
import heartSolid from "images/svg/heart-solid.svg";
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
        {stationIsFavorite ? (
          <button
            className={s({ favoriteButton: true, button: true })}
            onClick={() =>
              removeStationFromFavorites({
                name: station.name,
                siteId: station.siteId
              })
            }
          >
            <SVG
              svg={heartSolid}
              className={s({
                heart: true,
                heartSolid: true,
                heartSolid_newFavoriteStation: newFavoriteStation
              })}
            />
          </button>
        ) : (
          <button
            className={s({ favoriteButton: true, button: true })}
            onClick={() =>
              saveStationAsFavorite({
                name: station.name,
                siteId: station.siteId
              })
            }
          >
            <SVG svg={heartOutlined} className={s({ heart: true })} />
          </button>
        )}
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
