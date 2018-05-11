import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "reduxStore/store";
import { onInsertCssHandler } from "layout/WithCss";
import WithCssContext from "layout/WithCssContext";
import Root from "./Root";
import registerServiceWorker from "./registerServiceWorker";

render(
  <WithCssContext onInsertCss={onInsertCssHandler}>
    <Provider store={store}>
      <Root />
    </Provider>
  </WithCssContext>,

  document.getElementById("root")
);

registerServiceWorker();
