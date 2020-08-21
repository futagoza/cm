"use strict";

/**
 * Will confirm if the given `value` is a string.
 * 
 * @param {*} value The object to check.
 * @returns {Boolean} Will be `true` on a string.
 */

function isString( value ) {

    return typeof value === "string";

}

module.exports = isString;
