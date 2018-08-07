"use strict";

const { isArray } = Array;
const { MAX_SAFE_INTEGER } = Number;

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 * 
 * The core method behind my `Array#flat*` ponyfills.
 * 
 * This diverts from the spec defined for `FlattenIntoArray` by:
 * 
 * - not requiring the source length
 * - not requiring a thisArg for the callback
 * - source and target args switched around
 * - not following the spec in order to execute
 * - allowing depth with callback as long as `depth > 0`
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
    let element, sourceIndex, targetIndex;

    for ( sourceIndex = 0; sourceIndex < length; ++sourceIndex ) {

        if ( ! ( sourceIndex in S ) ) continue;

        element = S[ sourceIndex ];

        if ( D > 0 ) {

            if ( F ) element = F( element, sourceIndex, S );

            if ( isArray( element ) ) {

                CreateFlattenedArray( element, T, D - 1, F );
                continue;

            }

        }

        targetIndex = T.length;
        if ( targetIndex >= MAX_SAFE_INTEGER ) throw new TypeError( "index too large" );

        T[ targetIndex ] = element;

    }

    return T;

}

module.exports = CreateFlattenedArray;
