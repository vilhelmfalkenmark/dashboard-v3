import React, { Component } from "react";
import WithCss from "layout/WithCss";
import s from "./Input.css";

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { focus: props.inputValue || false };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
  }

  handleOnKeyDown(e) {
    if (e.key === "Enter" && this.props.handleSubmit) {
      this.props.handleSubmit();
    }
  }

  handleOnChange(e) {
    this.props.inputOnChange(e.target.value);
  }

  render() {
    const {
      inputLabel,
      inputValue,
      inputName,
      inputDisabled,
      submitButtonText
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
        onKeyDown={event => this.handleOnKeyDown(event)}
        onChange={event => this.handleOnChange(event)}
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
        {submitButtonText && (
          <button
            className={s({ submitButton: true })}
            onClick={() => this.props.handleSubmit()}
          >
            {submitButtonText}
          </button>
        )}
      </div>
    );
  }
}

export default WithCss(Input, s);
