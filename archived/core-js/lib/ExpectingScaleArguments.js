"use strict";

const ExpectingNumberArgument = require( "./ExpectingNumberArgument" );

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 * 
 * Assert's the arguments for `scale`-like methods are all numbers.
 * 
 * @param {String} P internal function's path
 * @param {Number} V value to scale
 * @param {Number} I1 inLow
 * @param {Number} I2 inHigh
 * @param {Number} O1 outLow
 * @param {Number} O2 outHigh
 */
function ExpectingScaleArguments( P, V, I1, I2, O1, O2 ) {

    ExpectingNumberArgument( V, P, "value" );
    ExpectingNumberArgument( I1, P, "inLow" );
    ExpectingNumberArgument( I2, P, "inHigh" );
    ExpectingNumberArgument( O1, P, "outLow" );
    ExpectingNumberArgument( O2, P, "outHigh" );

}

module.exports = ExpectingScaleArguments;
