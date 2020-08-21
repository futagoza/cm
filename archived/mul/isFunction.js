"use strict";

/**
 * Will confirm if the given `value` is a function.
 * 
 * @param {*} value The object to check.
 */

function isFunction( value ) {

    return typeof value === "function";

}

module.exports = isFunction;
