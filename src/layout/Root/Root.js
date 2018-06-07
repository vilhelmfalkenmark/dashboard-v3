import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "router/routes";
import WithCss from "hocs/WithCss";
import WithClient from "hocs/WithClient";
import { ApolloConsumer } from "react-apollo";
import Navigation from "layout/Navigation";

import s from "./Root.css";

export class RootComponent extends Component {
  constructor() {
    super();
    this.state = {
      geoLocation: null
    };

    this.getGeoLocation = this.getGeoLocation.bind(this);
    this.getGeolocationPromise = this.getGeolocationPromise.bind(this);
  }

  getGeolocationPromise() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getGeoLocation() {
    const { geoLocation } = this.state;
    if (geoLocation) {
      return geoLocation;
    }

    this.getGeolocationPromise()
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

  render() {
    return (
      <Router>
        <ApolloConsumer>
          {client => (
            <div className={s({ rootContainer: true })}>
              <Navigation />
              {routes.map((routeGroup, index) =>
                routeGroup.routes.map(route => (
                  <Route
                    key={route.key}
                    exact={route.exact}
                    path={route.slug}
                    component={WithClient(
                      route.component,
                      client,
                      this.state.geoLocation,
                      this.getGeoLocation
                    )}
                  />
                ))
              )}
            </div>
          )}
        </ApolloConsumer>
      </Router>
    );
  }
}

export default WithCss(RootComponent, s);
