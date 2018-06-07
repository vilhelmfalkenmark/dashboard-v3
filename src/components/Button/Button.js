import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import WithCss from "hocs/WithCss";

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

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClickCallback();
  }

  render() {
    const {
      // General
      className,
      // The text
      text,
      textClassName,
      // Color and type
      type,
      circleButton,
      shadowButton,
      // Icon
      icon,
      iconClassName,
      iconPositionLeft,
      // If it is a navigation button
      navLink,
      navLinkActiveClassName
    } = this.props;

    // css class names
    const CLASS_NAMES = s({
      container: true,
      container_circleButton: circleButton,
      // Background color
      container_blueSolid: type === BUTTON_BLUE_SOLID,
      container_lightBlueSolid: type === BUTTON_LIGHT_BLUE_SOLID,
      container_transparent: type === BUTTON_TRANSPARENT,
      // Shadow drop
      container_shadowButton: shadowButton,
      // Icon position
      container_iconleft: iconPositionLeft,
      // Passed prop classname
      [className]: className
    });

    // If link is displayed as button
    if (navLink) {
      return (
        <NavLink
          exact={navLink.exact}
          to={navLink.slug}
          onMouseDown={this.animate}
          className={CLASS_NAMES}
          activeClassName={navLinkActiveClassName}
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
        </NavLink>
      );
    }

    return (
      <button
        onClick={this.handleOnClick}
        onMouseDown={this.animate}
        className={CLASS_NAMES}
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
      </button>
    );
  }
}

export default WithCss(Button, s);
