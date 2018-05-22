import { is, isEmpty } from "ramda";

export const isNonEmptyArray = arr => is(Array, arr) && !isEmpty(arr);

export default isNonEmptyArray;
