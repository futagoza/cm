"use strict";

const __toString = Object.prototype.toString;

/**
 * Will confirm if the given `value` is a plain JavaScript Date value.
 *
 * @since 1.0.0-alpha.0
 * @param {*} value The object to check.
 * @returns {Boolean} Will be `true` on a Date value.
 */
function isDate( value ) {

    return value != null && __toString.call( value ) === "[object Date]";

}

module.exports = isDate;
