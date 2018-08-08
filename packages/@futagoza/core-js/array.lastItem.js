"use strict";

const ExpectingArrayArgument = require( "./lib/ExpectingArrayArgument" );

const P = require( "./lib/ImportablePath" )( "array.lastItem( value[, element] )" );

/**
 * Returns the right-most element defined in the given array.
 * 
 * If a second argument is provided, this will overide the right-most element.
 * 
 * @specification esnext (stage 1)
 * @since 1.0.0-alpha.0
 * @param {Array} value An array
 * @param {*} [item] An optional value to overide the last element
 * @returns {*} The right-most element
 */
function lastItem( value, item ) {

    ExpectingArrayArgument( value, P, "value" );

    const length = value.length;
    const index = length - 1;

    if ( arguments.length === 1 ) {

        if ( length < 0 ) return void 0;

        return value[ index ];

    }

    value[ index ] = item;
    return item;

}

module.exports = lastItem;
