import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { onInsertCssHandler } from "layout/WithCss";
import client from "apollo";

import WithCssContext from "layout/WithCssContext";
import Root from "layout/Root";

render(
  <WithCssContext onInsertCss={onInsertCssHandler}>
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  </WithCssContext>,
  document.getElementById("root")
);
