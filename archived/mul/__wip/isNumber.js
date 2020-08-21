"use strict";

/* eslint-disable no-self-compare */

/**
 * Will confirm if the given `value` is a number and not a `NaN`.
 *
 * @since 1.0.0-alpha.0
 * @param {*} value The object to check.
 * @returns {Boolean} Will be `true` on a number.
 */
function isNumber( value ) {

    return typeof value === "number" && value === value;

}

module.exports = isNumber;
