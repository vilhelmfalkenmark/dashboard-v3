import React, { Component } from "react";
import WithCss from "layout/WithCss";
import s from "./App.css";

class App extends Component {
  render() {
    return (
      <div className={s({ container: true })}>
        <h1>Welcome to React</h1>
      </div>
    );
  }
}

export default WithCss(App, s);
