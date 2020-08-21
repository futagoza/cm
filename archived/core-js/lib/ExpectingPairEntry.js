"use strict";

const isArray = Array.isArray;

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 *
 * This asserts that the given object is an array that has at least 2 elements.
 *
 * @param {Array} V An array of 2 elements.
 * @param {String} P The functions path.
 * @param {String} N A discriptive name for `V`
 */
function ExpectingPairEntry( V, P, N ) {

    if ( ! isArray( V ) )

        throw new TypeError( P + ": " + N + " is expected to be an array." );

    if ( V.length < 2 )

        throw new TypeError( P + ": " + N + " should contain at least 2 elements." );

}

module.exports = ExpectingPairEntry;
