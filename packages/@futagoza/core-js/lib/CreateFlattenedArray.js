"use strict";

const { isArray } = Array;
const { MAX_SAFE_INTEGER } = Number;

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 *
 * The core method behind my `Array#flat*` ponyfills.
 * 
 * @private
 * @param {Array} S The source array containing elements to copy
 * @param {Array} T The target array; elements will be moved here
 * @param {Number} D How deep a nested array should be flattened
 * @param {Function} [F] Element modifier before it is copied to target
 * @returns {Array} The updated `O` array.
 */
function CreateFlattenedArray( S, T, D, F ) {

    const length = S.length;
    const depth = D === 0 ? false
                : D === Infinity ? Infinity
                : D - 1;

    let index, value;
    for ( index = 0; index < length; ++index ) {

        if ( ! ( index in S ) ) continue;

        value = S[ index ];

        if ( F ) value = F( value, index, S );

        if ( isArray( value ) && depth !== false ) {

            CreateFlattenedArray( value, T, depth, F );
            continue;

        }

        if ( index >= MAX_SAFE_INTEGER ) throw new RangeError( "index too large" );

        T[ T.length ] = value;

    }

    return T;

}

module.exports = CreateFlattenedArray;
