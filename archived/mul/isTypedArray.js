"use strict";

// Based on: https://github.com/lodash/lodash/blob/master/isTypedArray.js

const __toString = Object.prototype.toString;
const regexp = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)\]$/;

/**
 * Checks if the given `value` is a typed array.
 * 
 * @param {*} value The object to check.
 */

function isTypedArray( value ) {

    return value != null
        && regexp.test( __toString.call( value ) );

}

module.exports = isTypedArray;
