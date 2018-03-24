import React from "react";
import WithCssContext from "layout/WithCssContext";
import { Provider } from "react-redux";

/**
 * AppProvider component
 * @param {Object} props Component props, containing store, insertCss func
 * @returns {jsx} renders
 */
const AppProvider = ({ store, onInsertCss, client, children }) => (
  <WithCssContext onInsertCss={onInsertCss}>
    <Provider store={store}>{children}</Provider>
  </WithCssContext>
);

export default AppProvider;
