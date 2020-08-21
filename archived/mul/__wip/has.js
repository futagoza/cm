"use strict";

const hasKey = require( "./hasKey" );
const hasOwn = require( "./hasOwn" );
/**
 * Checks if `key` can be found in `object`:
 * 
 * - if `key` is a property name, it is checked for via `Object#hasOwnProperty`
 * - if `key` is a property path, it is checked for via the native `in` operator
 * 
 * @since 1.0.0-alpha.0
 * @param {{}|Array} object An object to check.
 * @param {String|Number} key A property name or path.
 * @returns {Boolean} `true` if the property exists, `false` otherwise.
 */
function has( object, key ) {

    if ( typeof key === "string" && key.indexOf( "." ) === -1 )

        return hasOwn( object, key );

    return hasKey.Path( object, key );

}

module.exports = has;
