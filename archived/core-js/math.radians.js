"use strict";

const ExpectingNumberArgument = require( "./lib/ExpectingNumberArgument" );
const DEG_PER_RAD = require( "./math.DEG_PER_RAD" );

const P = require( "./lib/ImportablePath" )( "math.radians( degrees )" );

/**
 * 
 * 
 * @specification esnext (stage 1)
 * @since 1.0.0-alpha.0
 * @param {Number} degrees 
 * @returns {Number} 
 */
function radians( degrees ) {

    ExpectingNumberArgument( degrees, P, "degrees" );

    if ( Number.isNaN( degrees ) ) return NaN;

    if ( degrees === Infinity || degrees === -Infinity ) return degrees;

    return degrees * DEG_PER_RAD;

}

module.exports = radians;
