"use strict";

const isObject = require( "./isObject" );
const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * This method simply checks if the value is set on __any__ property in the given object.
 *
 * @since 1.0.0-alpha.0
 * @param {{}} object A plain JavaScript object (e.g. `{ ... }`)
 * @param {*} value A value to search for within the given object.
 * @returns {Boolean} `true` if `value` is found, otherwise `false`
 */
function includes( object, value ) {

    if ( ! isObject( object ) ) return false;

    for ( const name in object ) {

        if ( object[ name ] === value ) return true;

    }

    return false;

}

/**
 * This method checks if the value is set on __it's own__ property in the given object.
 *
 * @since 1.0.0-alpha.0
 * @param {{}} object A plain JavaScript object (e.g. `{ ... }`)
 * @param {*} value A value to search for within the given object.
 * @returns {Boolean} `true` if `value` is found, otherwise `false`
 */
function includesOwn( object, value ) {

    if ( ! isObject( object ) ) return false;

    for ( const name in object ) {

        if ( ! __hasOwnProperty.call( object, name ) ) continue;
        if ( object[ name ] === value ) return true;

    }

    return false;

}
includes.own = includesOwn;

module.exports = includes;
