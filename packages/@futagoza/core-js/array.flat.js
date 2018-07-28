"use strict";

const CreateFlattenedArray = require( "./lib/CreateFlattenedArray" );
const ExpectingArrayArgument = require( "./lib/ExpectingArrayArgument" );
const ToInteger = require( "./lib/ToInteger" );

const P = require( "./lib/ImportablePath" )( "array.flat( value[, depth] )" );

/**
 * The `flat()` method creates a new array with all sub-array elements concatted into it
 * recursively up to the specified depth.
 * 
 * @specification esnext (stage 3)
 * @since 1.0.0-alpha.0
 * @param {Array} value The array that you want to flatten.
 * @param {Number} [depth] Specify how deep a nested array should be flattened. _Defaults to 1._
 * @returns {Array} A new array with the sub-array elements concatted into it.
 */
function flat( value, depth = 1 ) {

    ExpectingArrayArgument( value, P, "value" );

    return CreateFlattenedArray( value, [], ToInteger( depth ) );

}

module.exports = flat;
