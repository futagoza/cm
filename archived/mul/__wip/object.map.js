"use strict";

const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Iterate over the given `object`, transforming each property with the results of it being
 * passed to `transformer`. Is similar to `Array#map`, but it is not compatible, because:
 * 
 * - it returns an object rather then an array
 * - it does not take a context (i.e. `this`)
 *
 * WARNING: This is for objects. Use `Array#map` for arrays.
 *
 * @since 1.0.0-alpha.0
 * @param {{}} object The object you wish to change
 * @param {Function} transformer The function to call when changing each property
 * @returns {{}} The new object containing the results.
 */
function map( object, transformer ) {

    const target = {};

    for ( const key in object ) {

        if ( ! __hasOwnProperty.call( object, key ) ) continue;
        target[ key ] = transformer( object[ key ], key, object );

    }

    return target;

}

module.exports = map;
