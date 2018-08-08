"use strict";

const ExpectingNumberArgument = require( "./lib/ExpectingNumberArgument" );

const P = require( "./lib/ImportablePath" )( "math.clamp( value, lower, upper )" );

/**
 * Clamp a number.
 * 
 * @specification esnext (stage 1)
 * @since 1.0.0-alpha.0
 * @param {Array} value The current number
 * @param {Array} lower The minimum number
 * @param {Array} upper The maximum number
 * @returns {*} The right-most element
 */
function clamp( value, lower, upper ) {

    ExpectingNumberArgument( value, P, "value" );
    ExpectingNumberArgument( lower, P, "lower" );
    ExpectingNumberArgument( upper, P, "upper" );

    if ( Number.isNaN( value ) ) return NaN;
    if ( Number.isNaN( lower ) ) return NaN;
    if ( Number.isNaN( upper ) ) return NaN;

    return Math.min( upper, Math.max( lower, value ) );

}

module.exports = clamp;
