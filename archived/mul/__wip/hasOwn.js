"use strict";

const checkForPath = require( "./internal/checkForPath" );
const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Will perform a null check before calling `Object#hasOwnProperty` to check
 * if the property exists on the object.
 *
 * @since 1.0.0-alpha.0
 * @param {{}|Array} object An object to check.
 * @param {String|Number} property A property name.
 * @returns {Boolean} `true` if the property exists, `false` otherwise.
 */
function hasOwn( object, property ) {

    return object != null && __hasOwnProperty.call( object, property );

}

/**
 * Will perform a null check before checking for the path via `Object#hasOwnProperty`
 *
 * @since 1.0.0-alpha.0
 * @param {{}|Array} object An object to check.
 * @param {String|Number} path A property path.
 * @returns {Boolean} `true` if the property exists, `false` otherwise.
 */
function hasPath( object, path ) {

    return checkForPath( object, path, key => __hasOwnProperty.call( object, key ) );

}
hasOwn.Path = hasPath;

module.exports = hasOwn;
