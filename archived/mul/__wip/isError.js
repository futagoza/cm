"use strict";

const __toString = Object.prototype.toString;

/**
 * Will confirm if the given `value` is a plain JavaScript Error value.
 *
 * @since 1.0.0-alpha.0
 * @param {*} value The object to check.
 * @returns {Boolean} Will be `true` on a Error value.
 */
function isError( value ) {

    return value != null && __toString.call( value ) === "[object Error]";

}

module.exports = isError;
