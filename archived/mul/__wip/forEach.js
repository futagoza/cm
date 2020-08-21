"use strict";

const isArrayLike = require( "./isArrayLike" );
const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Will loop through an object's properties calling the given function.
 * This is basically `Array#forEach` for objects, arrays and array-like's
 *
 * @since 1.0.0-alpha.0
 * @param {{}|Array} object An object or array-like object.
 * @param {Function} iterator A method to call on each property or element.
 * @param {*} [context] An object used as `this` within the `iterator` method (Optional).
 * @returns {void}
 */
function forEach( object, iterator, context ) {

    if ( object == null ) return void 0;

    if ( Array.isArray( object ) )

        object.forEach( iterator, context );

    else if ( isArrayLike( object ) ) {

        const length = object.length;

        for ( let index = 0; index < length; ++index ) {

            iterator.call( context, object[ index ], index, object );

        }

    } else

        for ( const key in object ) {

            if ( ! __hasOwnProperty.call( object, key ) ) continue;
            iterator.call( context, object[ key ], key, object );

        }

}

module.exports = forEach;
