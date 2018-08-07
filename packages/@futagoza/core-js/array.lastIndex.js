"use strict";

const ExpectingArrayArgument = require( "./lib/ExpectingArrayArgument" );

const P = require( "./lib/ImportablePath" )( "array.lastIndex( value )" );

/**
 * Returns the index of the right-most element defined in the given array.
 * 
 * @specification esnext (stage 1)
 * @since 1.0.0-alpha.0
 * @param {Array} value An array
 * @returns {Number} Index of the right-most element
 */
function lastIndex( value ) {

    ExpectingArrayArgument( value, P, "value" );

    const length = value.length;

    return length > 0 ? length - 1 : 0;

}

module.exports = lastIndex;
