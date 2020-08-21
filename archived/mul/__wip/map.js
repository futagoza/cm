"use strict";

const mapObject = require( "./object.map" );

/**
 * Iterate over the given `object`, transforming each property or element
 * before passing it to the new copy which is returned at the end.
 * 
 * `Array#map` for objects and arrays.
 *
 * @since 1.0.0-alpha.0
 * @param {{}|Array} object The object or array you wish to change
 * @param {Function} transformer The function to call when changing each property
 * @param {*} [context] An object used as `this` within the `transformer` method.
 * @returns {{}|Array} The new object or array containing the results.
 */
function map( object, transformer, context ) {

    if ( object == null ) return void 0;

    if ( Array.isArray( object ) ) return object.map( transformer, context );

    if ( context ) transformer = transformer.bind( context );
    return mapObject( object, transformer );

}

module.exports = map;
