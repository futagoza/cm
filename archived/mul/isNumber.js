"use strict";

/**
 * Will confirm if the given `value` is a number and not a `NaN`.
 * 
 * @param {*} value The object to check.
 */

function isNumber( value ) {

    return typeof value === "number"
        && ! Number.isNaN( value );

}

module.exports = isNumber;
