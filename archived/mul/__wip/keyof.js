"use strict";

/**
 * When given an array or string, this method returns the index of `value`, but when passed
 * an object this method will return the name of the property that contains `value`.
 * 
 * __WARNING:__ Unlike the native `indexOf` methods, this returns `void` instead of `-1` when
 * the given value's index or property name cannot be found.
 *
 * @since 1.0.0-alpha.0
 * @param {*} object An array, object or string.
 * @param {*} value The value that will be found on a index or property name.
 * @param {Number|String} [target] The index or property name expected (Optional).
 * @returns {Number|String|Boolean|void} The property name or index that is found.
 */
function keyof( object, value, target ) {

    if ( object == null ) return target == null ? void 0 : false;

    if ( Array.isArray( object ) || typeof object === "string" ) {

        const index = object.indexOf( value );

        return index === -1 ? void 0
            : target == null ? index
            : index === target;

    }

    for ( const name in object ) {

        if ( object[ name ] === value ) return target == null ? name : name === target;

    }

}

module.exports = keyof;
