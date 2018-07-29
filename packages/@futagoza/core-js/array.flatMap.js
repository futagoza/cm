"use strict";

const CreateFlattenedArray = require( "./lib/CreateFlattenedArray" );
const ExpectingArrayArgument = require( "./lib/ExpectingArrayArgument" );
const ExpectingFunctionArgument = require( "./lib/ExpectingFunctionArgument" );

const P = require( "./lib/ImportablePath" )( "array.flatMap( value, mapperFunction[, thisArg] )" );

/**
 * The `flatMap()` method first maps each element using a mapping function, then flattens the
 * result into a new array. It is identical to a map followed by a flat of depth 1, but flatMap is
 * quite often useful and merging both into one method is slightly more efficient.
 * 
 * @specification esnext (stage 3)
 * @since 1.0.0-alpha.0
 * @param {Array} value The array that you want to flatten.
 * @param {Function} mapperFunction A `forEach`-like method.
 * @param {*} [thisArg] Value to use as `this` when executing `callback`.
 * @returns {Array} A new array with the sub-array elements concatted into it.
 */
function flatMap( value, mapperFunction, thisArg ) {

    ExpectingArrayArgument( value, P, "value" );
    ExpectingFunctionArgument( mapperFunction, P, "value" );

    const cb = thisArg != null ? mapperFunction.bind( thisArg ) : mapperFunction;

    return CreateFlattenedArray( value, [], 1, cb );

}

module.exports = flatMap;
