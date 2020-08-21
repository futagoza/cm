"use strict";

const isArrayLike = require( "./isArrayLike" );
const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Iterate over the given `object`, transforming each property or element.
 * 
 * Based on `Array#map`, but will _update `object`_ instead of returning a new object.
 *
 * @since 1.0.0-alpha.0
 * @param {{}|Array} object The object or array you wish to change
 * @param {Function} transformer The function to call when changing each property
 * @param {*} [context] An object used as `this` within the `transformer` method.
 * @returns {{}|Array} The updated `object`.
 */
function update( object, transformer, context ) {

    if ( object == null ) return void 0;

    if ( isArrayLike( object ) ) {

        const length = object.length;

        for ( let index = 0; index < length; ++index ) {

            object[ index ] = transformer.call( context, object[ index ], index, object );

        }

    } else

        for ( const key in object ) {

            if ( ! __hasOwnProperty.call( object, key ) ) continue;
            object[ key ] = transformer.call( context, object[ key ], key, object );

        }

    return object;

}

module.exports = update;
