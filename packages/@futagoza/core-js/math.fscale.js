"use strict";

const ExpectingScaleArguments = require( "./lib/ExpectingScaleArguments" );
const ToScale = require( "./lib/ToScale" );

const P = require( "./lib/ImportablePath" )( "math.fscale( value, inLow, inHigh, outLow, outHigh )" );

/**
 * 
 * 
 * @specification esnext (stage 1)
 * @since 1.0.0-alpha.0
 * @param {Number} value 
 * @param {Number} inLow 
 * @param {Number} inHigh 
 * @param {Number} outLow 
 * @param {Number} outHigh 
 * @returns {Number} 
 */
function fscale( value, inLow, inHigh, outLow, outHigh ) {

    if ( arguments.length === 0 ) return NaN;
    ExpectingScaleArguments( P, value, inLow, inHigh, outLow, outHigh );

    const x = ToScale( value, inLow, inHigh, outLow, outHigh );

    return Number.isNaN( x ) ? x : Math.fround( x );

}

module.exports = fscale;
