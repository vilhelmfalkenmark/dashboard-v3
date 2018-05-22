import React, { Component } from "react";
import WithCss from "layout/WithCss";
import Button from "components/Button";
import { BUTTON_TRANSPARENT } from "utils/constants/buttonTypes";

import s from "./DepartureListByTransport.css";

class DepartureListByTransport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCount: 5
    };

    this.showMore = this.showMore.bind(this);
  }

  showMore() {
    this.setState({
      showCount: this.state.showCount + 5
    });
  }

  render() {
    const { departures, title, type } = this.props;
    const { showCount } = this.state;

    return (
      <div className={s({ container: true })}>
        <h4 className={s({ heading: true })}>{`${title} - ${
          departures.length
        } avgångar`}</h4>
        <ul className={s({ list: true })}>
          {departures.filter((s, i) => i < showCount).map((departure, i) => (
            <li key={i} className={s({ item: true })}>
              <p className={s({ lineNumber: true })}>
                <span
                  className={s({
                    line: true,
                    line_bus: type === "bus",
                    line_metro: type === "metro",
                    line_train: type === "train"
                  })}
                >
                  {departure.lineNumber}
                </span>
                <span>{departure.destination}</span>
              </p>
              <p className={s({ displayTime: true })}>
                {departure.displayTime}
              </p>
            </li>
          ))}
        </ul>
        {showCount < departures.length && (
          <Button
            text={"Visa fler"}
            onClickCallback={this.showMore}
            type={BUTTON_TRANSPARENT}
            className={s({ showMoreButton: true })}
          />
        )}
      </div>
    );
  }
}

export default WithCss(DepartureListByTransport, s);
