"use strict";

/**
 * Will confirm if the given `value` is an array-like object.
 * 
 * @param {*} value The object to check.
 */

function isArrayLike( value ) {

    return value != null && "length" in value && typeof value !== "function";

}

module.exports = isArrayLike;
