import { connect } from "react-redux";
import Departures from "./Departures";

const mapStateToProps = state => ({
  data: state.departures.data,
  fetching: state.departures.fetching,
  fulfilled: state.departures.fulfilled,
  rejected: state.departures.rejected,
  test: state.departures.test
});

export default connect(mapStateToProps)(Departures);
