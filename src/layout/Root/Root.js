import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "router/routes";
import WithCss from "layout/WithCss";
import { ApolloConsumer } from "react-apollo";
import Navigation from "layout/Navigation";

import s from "./Root.css";

function withClient(WrappedComponent, client, geoLocation, getGeoLocation) {
  return class extends Component {
    render() {
      if (!client) {
        return null;
      }
      return (
        <WrappedComponent
          {...this.props}
          client={client}
          geoLocation={geoLocation}
          getGeoLocation={getGeoLocation}
        />
      );
    }
  };
}

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
                    component={withClient(
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
