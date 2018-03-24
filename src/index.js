import React from "react";
import { render } from "react-dom";
import AppProvider from "layout/Provider";
import store from "reduxStore/store";
import { onInsertCssHandler } from "layout/WithCss";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App";

render(
  <AppProvider store={store} onInsertCss={onInsertCssHandler}>
    <App />
  </AppProvider>,
  document.getElementById("root")
);

registerServiceWorker();
