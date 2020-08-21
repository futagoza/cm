"use strict";

const __toString = Object.prototype.toString;

/**
 * Will confirm if the given `value` is a plain JavaScript RegExp.
 *
 * @since 1.0.0-alpha.0
 * @param {*} value The object to check.
 * @returns {Boolean} Will be `true` on a RegExp.
 */
function isRegExp( value ) {

    return value != null && __toString.call( value ) === "[object RegExp]";

}

module.exports = isRegExp;
