export { default } from "./WithCss";

/**
 * Helper for injecting css in the DOM
 * @returns {bool} true
 */
export const onInsertCssHandler = (...styles) => {
  styles.forEach(style => style._insertCss());
};
