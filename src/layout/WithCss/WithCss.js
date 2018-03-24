import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Helper to insert css in the DOM (should use
 * isomorphic-style-loader/lib/withStyles and make sure it renders on the server)
 * @param  {Component} ComposedComponent React component
 * @param  {Object} styles Styling object
 * @return {Component} Higher order component
 */

export function withCss(ComposedComponent, ...styles) {
  class Styles extends Component {
    componentWillMount() {
      this.removeCss = this.context.insertCss.apply(undefined, styles);
    }

    componentWillUnmount() {
      setTimeout(this.removeCss, 0);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Styles.contextTypes = {
    insertCss: PropTypes.func
  };

  return Styles;
}

export default withCss;
