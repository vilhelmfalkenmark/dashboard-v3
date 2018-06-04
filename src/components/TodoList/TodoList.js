import React, { Component } from "react";
import Button from "components/Button";
import heartSolidIcon from "images/svg/heart-solid.svg";

import WithCss from "layout/WithCss";
import s from "./TodoList.css";

class TodoList extends Component {
  componentDidMount() {
    this.props.subscribeToChanges();
  }

  render() {
    const { myTodos, deleteTodo } = this.props;

    return (
      <ul className={s({ list: true })}>
        {myTodos.map(todo => (
          <li key={todo.id} className={s({ item: true })}>
            <span className={s({ text: true })}>{todo.value}</span>
            <Button
              onClickCallback={() => deleteTodo({ id: todo.id })}
              icon={heartSolidIcon}
              className={s({ button: true })}
              iconClassName={s({ icon: true })}
              circleButton
              shadowButton
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default WithCss(TodoList, s);
