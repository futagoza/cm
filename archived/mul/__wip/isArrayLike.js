"use strict";

/**
 * Will confirm if the given `value` is an array-like object.
 *
 * @since 1.0.0-alpha.0
 * @param {*} value The object to check.
 * @returns {Boolean} Will be `true` on array-like objects.
 */
function isArrayLike( value ) {

    return value != null
        && typeof value !== "function"
        && typeof value.length === "number";

}

module.exports = isArrayLike;
