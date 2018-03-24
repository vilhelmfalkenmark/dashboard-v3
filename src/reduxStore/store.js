import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./rootReducer";

/**
 * Apply middleware
 * client = Apollo-client. So we can see the apollo state in the redux tree
 * promise and thunk = So we can handle asynchronous calls in our redux actions
 */
const middleware = applyMiddleware(promise(), thunk);

/**
 * REDUX DEVTOOLS
 */
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, reduxDevTools, middleware);

export default store;
