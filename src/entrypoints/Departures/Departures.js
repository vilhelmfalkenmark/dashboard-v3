import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import WithCss from "layout/WithCss";

import MyFavoriteStations from "components/MyFavoriteStations";
import SearchStation from "components/SearchStation";
import CloseDepartures from "components/CloseDepartures";
import Button from "components/Button";

import heartSolidIcon from "images/svg/heart-solid.svg";
import searchIcon from "images/svg/search.svg";
import positonIcon from "images/svg/position.svg";

import {
  BUTTON_BLUE_SOLID,
  BUTTON_LIGHT_BLUE_SOLID
} from "utils/constants/buttonTypes";

import s from "./Departures.css";
import DeparturesTypes from "./Departures.propTypes";

const NAV_ITEMS = [
  { title: "Sök stationer", navPath: "SearchStation", icon: searchIcon },
  {
    title: "Mina favoriter",
    navPath: "MyFavoriteStations",
    icon: heartSolidIcon
  },
  { title: "Nära avgångar", navPath: "CloseDepartures", icon: positonIcon }
];

class Departures extends Component {
  constructor() {
    super();
    this.state = {
      nav: "MyFavoriteStations",
      geoLocation: null
    };

    this.getActiveComponent = this.getActiveComponent.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
  }

  getGeolocation(options) {
    const { geoLocation } = this.state;
    if (geoLocation) {
      return geoLocation;
    }
    const gPromise = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });

    gPromise()
      .then(pos => {
        this.setState({
          geoLocation: pos
        });
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  getActiveComponent(client) {
    const { nav } = this.state;

    switch (nav) {
      case "SearchStation":
        return <SearchStation client={client} />;
      case "MyFavoriteStations":
        return <MyFavoriteStations client={client} />;
      case "CloseDepartures": {
        return (
          <CloseDepartures client={client} position={this.getGeolocation()} />
        );
      }
      default:
        return <SearchStation client={client} />;
    }
  }

  render() {
    const { nav } = this.state;

    return (
      <ApolloConsumer>
        {client => (
          <div className={s({ container: true })}>
            <nav className={s({ navBar: true })}>
              {NAV_ITEMS.map((item, i) => (
                <Button
                  key={i}
                  text={item.title}
                  onClickCallback={() => this.setState({ nav: item.navPath })}
                  icon={item.icon}
                  type={
                    nav === item.navPath
                      ? BUTTON_BLUE_SOLID
                      : BUTTON_LIGHT_BLUE_SOLID
                  }
                  className={s({ navButton: true })}
                  iconClassName={s({ icon: true })}
                  textClassName={s({ navText: true })}
                  iconPositionLeft
                />
              ))}
            </nav>
            <div className={s({ content: true })}>
              <div className={s({ overflow: true })}>
                {this.getActiveComponent(client)}
              </div>
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

Departures.propTypes = DeparturesTypes;

export default WithCss(Departures, s);
