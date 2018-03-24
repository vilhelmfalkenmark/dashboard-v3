import PropTypes from "prop-types";

const DepartureTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  fetching: PropTypes.bool,
  fulfilled: PropTypes.bool,
  rejected: PropTypes.bool
};

export default DepartureTypes;
