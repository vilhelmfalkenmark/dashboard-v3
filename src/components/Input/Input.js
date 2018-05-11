import React, { Component } from "react";
import WithCss from "layout/WithCss";
import s from "./Input.css";

export class Input extends Component {
  constructor() {
    super();
    this.state = { focus: false };
  }

  render() {
    const {
      inputLabel,
      inputOnChange,
      inputValue,
      inputName,
      inputDisabled
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
        onChange={event => inputOnChange(event.target.value)}
        className={s.field}
      />,
      <span className={s.line} key={2} />
      // <span className={s.background} key={3} />
    ];
    const labelHtml = (
      <label
        htmlFor={inputName}
        className={`${s.label} ${focus ? s.isFocused : null}`}
      >
        {inputLabel}
      </label>
    );

    return (
      <div className={s({ container: true })}>
        {labelHtml}
        {inputHtml}
      </div>
    );
  }
}

export default WithCss(Input, s);
