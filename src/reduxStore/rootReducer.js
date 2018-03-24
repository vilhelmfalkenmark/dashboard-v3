import { combineReducers } from "redux";

import departures from "./departures/reducer";

const reducer = combineReducers({
  departures
});

export default reducer;
