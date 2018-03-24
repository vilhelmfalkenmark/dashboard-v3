import { Component, Children } from "react";
import PropTypes from "prop-types";

/**
 * WithStylesContext component
 * @returns {jsx} React markup
 */
class WithCssContext extends Component {
  /**
   * Inserts the onInsertCSS into child elements
   * @returns {Object} Child context, with insertCSS bound
   */
  getChildContext() {
    return { insertCss: this.props.onInsertCss };
  }

  /**
   * @returns {jsx} render
   */
  render() {
    return Children.only(this.props.children);
  }
}

WithCssContext.propTypes = {
  children: PropTypes.element.isRequired,
  onInsertCss: PropTypes.func.isRequired
};

WithCssContext.childContextTypes = {
  insertCss: PropTypes.func.isRequired
};

export default WithCssContext;
