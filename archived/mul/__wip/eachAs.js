"use strict";

const isArrayLike = require( "./isArrayLike" );
const IterableVistor = require( "./internal/IterableVistor" );
const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Will loop through an object's properties calling the given function, passing each key and
 * value pair as an array with properies attached to it:
 * 
 * ```js
 * eachAs( object, entry => {
 *     Array.isArray( entry ) === true;
 *     entry[ 0 ]   // property name or element index
 *     entry[ 1 ]   // content for the property or element
 *     entry.count  // property or element count
 *     entry.key    // property name or element index
 *     entry.value  // content for the property or element
 *     entry.source // refrence to the passed object
 *     Object.isFrozen( entry ) === true;
 * } );
 * ```
 *
 * _WARNING:_ This method is not compatible with functions meant for `Array#forEach`.
 *
 * @since 1.0.0-alpha.0
 * @param {{}|Array} object An object or array-like object.
 * @param {Function} iterator A method to call on each property or element.
 * @returns {void}
 */
function eachAs( object, iterator ) {

    if ( object == null ) return void 0;

    const iterable = new IterableVistor( object, iterator );

    if ( isArrayLike( object ) ) {

        const length = object.length;

        for ( let index = 0; index < length; ++index ) iterable.visit( index );

    } else

        for ( const name in object ) {

            if ( __hasOwnProperty.call( object, name ) ) iterable.visit( name );

        }

}

module.exports = eachAs;
