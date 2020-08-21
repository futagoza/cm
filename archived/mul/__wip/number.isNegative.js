"use strict";

const isNumber = require( "./isNumber" );

/**
 * Will confirm if the given `value` is a negative number (below `0`).
 *
 * @since 1.0.0-alpha.0
 * @param {*} value The number to check.
 * @returns {Boolean} Will be `true` on a negative number.
 */
function isNegative( value ) {

    return isNumber( value ) && value < 0;

}

module.exports = isNegative;
