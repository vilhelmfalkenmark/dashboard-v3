import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import { onInsertCssHandler } from "layout/WithCss";
import client from "./apollo";

import WithCssContext from "layout/WithCssContext";
import Root from "components/Root";
import registerServiceWorker from "./registerServiceWorker";

render(
  <WithCssContext onInsertCss={onInsertCssHandler}>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <Root />
      </ReduxProvider>
    </ApolloProvider>
  </WithCssContext>,

  document.getElementById("root")
);

registerServiceWorker();
