const path = require("path");

/**
 * PostCSS Load Config
 * https://github.com/michael-ciniawsky/postcss-load-config
 * @param  {object} ctx Context
 * @return {object}     PostCSS load config
 */
module.exports = ctx => ({
  /**
   * The list of plugins for PostCSS
   * https://github.com/postcss/postcss
   */
  plugins: {
    /**
     * Transfer @import rule by inlining content, e.g. @import 'normalize.css'
     * https://github.com/postcss/postcss-import
     */
    "postcss-import": {
      path: path.join(__dirname, "../src/styles")
    },
    "postcss-mixins": {},
    /**
     * Postcss flexbox bug fixer
     * https://github.com/luisrudge/postcss-flexbugs-fixes
     */
    "postcss-flexbugs-fixes": {},
    /**
     * PostCSS plugin that adds 'fix' and 'fix-legacy' arguments to the 'clear' property
     * https://github.com/seaneking/postcss-clearfix
     */
    "postcss-clearfix": {},
    /**
     * Unwraps nested rules like how Sass does it
     * https://github.com/postcss/postcss-nested
     */
    "postcss-nested": {},
    /**
     * Optimize CSS
     * http://cssnano.co/
     */
    cssnano:
      ctx.env === "production"
        ? {
            autoprefizer: false
          }
        : false,
    /**
     * PostCSS plugin to use tomorrow's CSS syntax, today.
     * https://github.com/MoOx/postcss-cssnext
     */
    "postcss-cssnext": {}
  }
});
