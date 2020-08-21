"use strict";

const ExpectingArrayArgument = require( "./lib/ExpectingArrayArgument" );
const ExpectingPairEntry = require( "./lib/ExpectingPairEntry" );

const P = require( "./lib/ImportablePath" )( "object.fromEntries( iterable )" );

/**
 * Takes an array of key/value pairs and returns a plain Object.
 * 
 * @specification esnext (stage 3)
 * @since 1.0.0-alpha.0
 * @param {Array} iterable An array of key/value
 * @returns {{}} The objectified `iterable`
 */
function fromEntries( iterable ) {

    ExpectingArrayArgument( iterable, P, "iterable" );

    const target = {};

    let i = 0;

    for ( const element of iterable ) {

        if ( element != null ) {

            ExpectingPairEntry( element, P, `iterable[ ${ i } ]` );

            target[ element[ 0 ] ] = element[ 1 ];

        }

        ++i;

    }

    return target;

}

module.exports = fromEntries;
