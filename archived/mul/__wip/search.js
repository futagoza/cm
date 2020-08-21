"use strict";

const isArrayLike = require( "./isArrayLike" );
const IterableVistor = require( "./internal/IterableVistor" );
const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Will go through the given object like this library's `eachAs` method, but when `condition`
 * returns a value that is not `falsy`, it will end the iteration and return `true`, otherwise
 * it will return `false`.
 * 
 * ```js
 * const found = search( object, entry => Object.isFrozen( entry ) );
 * 
 * found === true; //  `true` should be returned by the above callback.
 * ```
 *
 * _WARNING:_ This method is not compatible with functions meant for `Array#forEach`.
 *
 * @since 1.0.0-alpha.0
 * @param {{}|Array} object An object or array-like object to search.
 * @param {Function} condition A method to call on each property or element.
 * @returns {Boolean} Will return `true` if `condition` returns something not `falsy`
 */
function search( object, condition ) {

    if ( object == null ) return false;

    const iterable = new IterableVistor( object, condition );

    if ( isArrayLike( object ) ) {

        const length = object.length;

        for ( let index = 0; index < length; ++index ) {

            if ( iterable.visit( index ) ) return true;

        }

    } else

        for ( const name in object ) {

            if ( ! __hasOwnProperty.call( object, name ) ) continue;
            if ( iterable.visit( name ) ) return true;

        }

    return false;

}

module.exports = search;
