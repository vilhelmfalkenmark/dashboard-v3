import React, { Component } from "react";
import WithCss from "layout/WithCss";
import SVG from "components/SVG";

import {
  BUTTON_BLUE_SOLID,
  BUTTON_LIGHT_BLUE_SOLID,
  BUTTON_TRANSPARENT
} from "utils/constants/buttonTypes";

import s from "./Button.css";

class Button extends Component {
  constructor() {
    super();

    this.state = {
      animation: false,
      initiallyHandled: false,
      animationId: null
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.animate = this.animate.bind(this);
  }

  animate() {
    this.setState({
      animation: !this.state.animation,
      initiallyHandled: true
    });
  }

  handleOnClick() {
    this.props.onClickCallback();
  }

  render() {
    const {
      className,
      text,
      textClassName,
      type,
      icon,
      iconClassName,
      iconPositionLeft
    } = this.props;

    return (
      <button
        onClick={this.handleOnClick}
        onMouseDown={this.animate}
        className={s({
          container: true,
          container_blueSolid: type === BUTTON_BLUE_SOLID,
          container_lightBlueSolid: type === BUTTON_LIGHT_BLUE_SOLID,
          container_transparent: type === BUTTON_TRANSPARENT,
          container_animated: this.state.animation,
          container_notAnimated:
            !this.state.animation && this.state.initiallyHandled,
          container_iconleft: iconPositionLeft,
          [className]: className
        })}
      >
        <span className={s({ text: true, [textClassName]: textClassName })}>
          {text}
        </span>
        {icon && (
          <SVG
            svg={icon}
            className={s({ icon: true, [iconClassName]: iconClassName })}
          />
        )}
        <div className={s({ anim: true })} />
      </button>
    );
  }
}

export default WithCss(Button, s);
