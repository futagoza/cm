"use strict";

/* eslint-disable no-mixed-operators */

/**
 * Generates a pseudorandom number between `min` and `max`. If there is only one
 * argument, then it will be used as the value for `max`, while `min` is set to `0`.
 *
 * @since 1.0.0-alpha.0
 * @param {Number} [min] The minimum number to use. _(default is `0`)_
 * @param {Number} max The maximum number to use
 * @returns {Number} A random number.
 */
function random( min, max ) {

    if ( typeof max !== "number" ) max = min, min = 0;

    return min + ( 0 | Math.random() * ( max - min + 1 ) );

}

module.exports = random;
