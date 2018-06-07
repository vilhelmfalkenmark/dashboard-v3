import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { onInsertCssHandler } from "hocs/WithCss";
import client from "apollo";

import WithCssContext from "hocs/WithCssContext";
import Root from "layout/Root";

render(
  <WithCssContext onInsertCss={onInsertCssHandler}>
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  </WithCssContext>,
  document.getElementById("root")
);
