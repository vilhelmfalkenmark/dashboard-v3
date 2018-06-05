import React, { Component } from "react";
import WithCss from "layout/WithCss";
import Input from "components/Input";
import TodoList from "components/TodoList";
import plusIcon from "images/svg/plus.svg";

import { Query } from "react-apollo";

import {
  ADD_NEW_TODO,
  DELETE_TODO,
  MY_TODOS,
  TODO_CHANGED_SUBSCRIPTION
} from "utils/schemas/todos";

import s from "./Todos.css";

class Todos extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: "",
      changedID: null
    };

    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.submitNewTodo = this.submitNewTodo.bind(this);
  }

  handleNewTodo(value) {
    this.setState({
      newTodo: value
    });
  }

  handleDeleteTodo({ id }) {
    const { client } = this.props;

    return (async () => {
      await client.mutate({
        mutation: DELETE_TODO,
        variables: { id },
        update: (cache, { data: { deletedTodo } }) => {
          const { myTodos } = cache.readQuery({
            query: MY_TODOS
          });
          cache.writeQuery({
            query: MY_TODOS,
            data: {
              myTodos: myTodos.filter(todo => {
                return todo.id !== deletedTodo.id;
              })
            }
          });
        }
      });
    })();
  }

  submitNewTodo() {
    const { client } = this.props;

    return (async () => {
      await client.mutate({
        mutation: ADD_NEW_TODO,
        variables: { value: this.state.newTodo, id: Date.now() }
        // update: (cache, { data: { newTodo } }) => {
        //   const { myTodos } = cache.readQuery({
        //     query: MY_TODOS
        //   });

        //   cache.writeQuery({
        //     query: MY_TODOS,
        //     data: {
        //       myTodos: myTodos.concat([newTodo])
        //     }
        //   });
        // }
      });
      this.setState({
        newTodo: ""
      });
    })();
  }

  render() {
    const { newTodo } = this.state;

    return (
      <main className={s({ container: true })}>
        <div className={s({ content: true })}>
          <Query query={MY_TODOS}>
            {({ subscribeToMore, data, error, loading, refetch }) => {
              if (loading) return <p>Laddar todolist</p>;
              if (error) return `Error!: ${error}`;
              return [
                <Input
                  key={1}
                  inputLabel="Ny att göra"
                  inputPlaceholder="Exempelvis Klippa gräset"
                  inputName="newTodo"
                  inputDisabled={false}
                  inputValue={newTodo}
                  submit={this.submitNewTodo}
                  submitButtonIcon={plusIcon}
                  inputOnChange={value => this.handleNewTodo(value)}
                />,
                <TodoList
                  key={2}
                  myTodos={data.myTodos}
                  deleteTodo={this.handleDeleteTodo}
                  subscribeToChanges={() =>
                    subscribeToMore({
                      document: TODO_CHANGED_SUBSCRIPTION,
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        const updatedTodo = subscriptionData.data.todoChanged;

                        if (updatedTodo.action === "TODO_ADDED") {
                          return Object.assign({}, prev, {
                            myTodos: [updatedTodo, ...prev.myTodos]
                          });
                        } else if (updatedTodo.action === "TODO_DELETED") {
                          return Object.assign({}, prev, {
                            myTodos: prev.myTodos.filter(
                              todo => todo.id !== updatedTodo.id
                            )
                          });
                        }

                        return prev;
                      }
                    })
                  }
                />
              ];
            }}
          </Query>
        </div>
      </main>
    );
  }
}

export default WithCss(Todos, s);
