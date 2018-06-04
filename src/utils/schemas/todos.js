import gql from "graphql-tag";

export const MY_TODOS = gql`
  query myTodos {
    myTodos {
      value
      id
      done
    }
  }
`;

export const ADD_NEW_TODO = gql`
  mutation addNewTodo($value: String!, $id: Float!) {
    newTodo: addNewTodo(params: { value: $value, id: $id }) {
      value
      id
      done
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: Float!) {
    deletedTodo: deleteTodo(params: { id: $id }) {
      value
      id
      done
    }
  }
`;

export const TODO_CHANGED_SUBSCRIPTION = gql`
  subscription todoChanged {
    todoChanged {
      value
      id
      done
      action
    }
  }
`;

// export const TOGGLE_TODO_STATUS = gql`
//   mutation saveStationAsFavorite($name: String!, $siteId: String!) {
//     newFavoriteStation: saveStationAsFavorite(
//       params: { name: $name, siteId: $siteId }
//     ) {
//       name: Name
//       siteId: SiteId
//     }
//   }
// `;
