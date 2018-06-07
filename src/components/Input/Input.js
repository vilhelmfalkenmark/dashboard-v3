import React, { Component } from "react";
import WithCss from "hocs/WithCss";
import Button from "components/Button";

import s from "./Input.css";

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { focus: props.inputValue || false };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange(e) {
    this.props.inputOnChange(e.target.value);
  }

  handleOnKeyDown(e) {
    if (e.key === "Enter" && this.props.submit) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    // Dont submit if empty input
    if (this.props.inputValue) {
      this.props.submit();
    }
  }

  render() {
    const {
      inputLabel,
      inputValue,
      inputName,
      inputDisabled,
      submitButtonIcon
    } = this.props;
    const { focus } = this.state;
    const inputHtml = [
      <input
        key={1}
        disabled={inputDisabled}
        name={inputName}
        value={inputValue}
        onFocus={() =>
          this.setState({
            focus: true
          })
        }
        onBlur={() =>
          this.setState({
            focus: inputValue ? true : false
          })
        }
        onKeyDown={this.handleOnKeyDown}
        onChange={this.handleOnChange}
        className={s({ input: true })}
      />,
      <span className={s.line} key={2} />
    ];
    const labelHtml = (
      <label
        htmlFor={inputName}
        className={s({ label: true, label_isFocused: focus })}
      >
        {inputLabel}
      </label>
    );

    return (
      <div className={s({ container: true })}>
        {labelHtml}
        {inputHtml}
        {submitButtonIcon && (
          <Button
            onClickCallback={this.handleSubmit}
            icon={submitButtonIcon}
            className={s({ submitButton: true })}
            iconClassName={s({ icon: true })}
            circleButton
            shadowButton
          />
        )}
      </div>
    );
  }
}

export default WithCss(Input, s);
