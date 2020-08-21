"use strict";

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 *
 * This is a simpler version of `Math.sign()` that returns a `1` for any numrical value at or
 * higher then `0`, and `-1` otherwise.
 * 
 * @param {Number} V A positive or negative number
 * @returns {Number} `1` for positive numbers, otherwise `-1`
 */
function GetSignedOne( V ) {

    return V >= 0 ? 1 : -1;

}

module.exports = GetSignedOne;
