"use strict";

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 * 
 * 
 * 
 * @param {Number} V value to scale
 * @param {Number} I1 inLow
 * @param {Number} I2 inHigh
 * @param {Number} O1 outLow
 * @param {Number} O2 outHigh
 */
function ToScale( V, I1, I2, O1, O2 ) {

    if ( Number.isNaN( V ) ) return NaN;
    if ( Number.isNaN( I1 ) ) return NaN;
    if ( Number.isNaN( I2 ) ) return NaN;
    if ( Number.isNaN( O1 ) ) return NaN;
    if ( Number.isNaN( O2 ) ) return NaN;

    if ( V === Infinity || V === -Infinity ) return V;

    let x = V - I1;
    x *= O2 - O1;
    x /= I2 - I1;
    x += O1;
    return x;

}

module.exports = ToScale;
