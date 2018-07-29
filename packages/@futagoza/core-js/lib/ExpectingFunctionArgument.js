"use strict";

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 *
 * This will throw a `TypeError` if `V` is not a function.
 *
 * @param {*} V A value that is expected to be an function.
 * @param {String} P The functions path.
 * @param {String} N A discriptive name for the argument
 */
function ExpectingFunctionArgument( V, P, N ) {

    if ( typeof V !== "function" )

        throw new TypeError( P + ": " + N + " is expected to be a function." );

}

module.exports = ExpectingFunctionArgument;
