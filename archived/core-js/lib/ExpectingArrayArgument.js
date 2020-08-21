"use strict";

const isArray = Array.isArray;

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 *
 * This will throw a `TypeError` if `V` is not an array.
 *
 * @param {*} V A value that is expected to be an array.
 * @param {String} P The functions path.
 * @param {String} N A discriptive name for the argument
 */
function ExpectingArrayArgument( V, P, N ) {

    if ( ! isArray( V ) )

        throw new TypeError( P + ": " + N + " is expected to be an array." );

}

module.exports = ExpectingArrayArgument;
