import React, { Component } from "react";
import WithCss from "layout/WithCss";
import Input from "components/Input";
import s from "./Departures.css";
import DeparturesTypes from "./Departures.propTypes";

class Departures extends Component {
  constructor() {
    super();

    this.state = {
      searchStation: ""
    };

    this.searchStationByName = this.searchStationByName.bind(this);
  }

  searchStationByName() {
    console.log(this.state.searchStation);
  }

  render() {
    return (
      <div className={s({ container: true })}>
        <h2 className={s({ heading: true })}>Avgångar</h2>
        <Input
          inputLabel="Sök station"
          inputPlaceholder="Exempelvis odenplan"
          inputName="searchStation"
          inputDisabled={false}
          inputValue={this.state.searchStation}
          inputOnChange={value =>
            this.setState({
              searchStation: value
            })
          }
        />
        <button onClick={this.searchStationByName}>Sök stationer</button>
      </div>
    );
  }
}

Departures.propTypes = DeparturesTypes;

export default WithCss(Departures, s);
