"use strict";

/**
 * Will confirm if the given `value` is a function.
 *
 * @since 1.0.0-alpha.0
 * @param {*} value The object to check.
 * @returns {Boolean} Will be `true` on a function.
 */
function isFunction( value ) {

    return typeof value === "function";

}

module.exports = isFunction;
