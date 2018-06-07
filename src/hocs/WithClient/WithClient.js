import React, { Component } from "react";

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

export default withClient;
