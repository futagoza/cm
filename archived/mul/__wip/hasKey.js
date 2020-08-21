"use strict";

const checkForPath = require( "./internal/checkForPath" );

/**
 * Will perform a null check before checking for the property via the native `in` operator.
 *
 * @since 1.0.0-alpha.0
 * @param {{}|Array} object An object to check.
 * @param {String|Number} name A property name.
 * @returns {Boolean} `true` if the property exists, `false` otherwise.
 */
function hasKey( object, name ) {

    return object != null && name in object;

}

/**
 * Will perform a null check before checking for the path via the native `in` operator.
 *
 * @since 1.0.0-alpha.0
 * @param {{}|Array} object An object to check.
 * @param {String|Number} path A property path.
 * @returns {Boolean} `true` if the property exists, `false` otherwise.
 */
function hasPath( object, path ) {

    return checkForPath( object, path, key => key in object );

}
hasKey.Path = hasPath;

module.exports = hasKey;
