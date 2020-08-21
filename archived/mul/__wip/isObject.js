"use strict";

const __toString = Object.prototype.toString;

/**
 * Will confirm if the given `value` is a plain JavaScript object/hash.
 *
 * @since 1.0.0-alpha.0
 * @param {*} value The object to check.
 * @returns {Boolean} Will be `true` on a plain object.
 */
function isObject( value ) {

    return value != null && __toString.call( value ) === "[object Object]";

}

module.exports = isObject;
