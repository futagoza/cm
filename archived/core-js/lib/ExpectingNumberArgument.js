"use strict";

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 *
 * This will throw a `TypeError` if `V` is not a number.
 *
 * @param {*} V A value that is expected to be an number.
 * @param {String} P The functions path.
 * @param {String} N A discriptive name for the argument
 */
function ExpectingNumberArgument( V, P, N ) {

    if ( typeof V !== "number" )

        throw new TypeError( P + ": " + N + " is expected to be a number." );

}

module.exports = ExpectingNumberArgument;
