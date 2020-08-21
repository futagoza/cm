"use strict";

const ExpectingNumberArgument = require( "./lib/ExpectingNumberArgument" );
const RAD_PER_DEG = require( "./math.RAD_PER_DEG" );

const P = require( "./lib/ImportablePath" )( "math.degrees( radians )" );

/**
 * 
 * 
 * @specification esnext (stage 1)
 * @since 1.0.0-alpha.0
 * @param {Number} radians 
 * @returns {Number} 
 */
function degrees( radians ) {

    ExpectingNumberArgument( radians, P, "radians" );

    if ( Number.isNaN( radians ) ) return NaN;

    if ( radians === Infinity || radians === -Infinity ) return radians;

    return radians * RAD_PER_DEG;

}

module.exports = degrees;
