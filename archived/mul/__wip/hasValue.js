"use strict";

const isObject = require( "./isObject" );
const arrayIncludes = require( "./std/array.includes" );
const stringIncludes = require( "./std/string.includes" );
const objectIncludes = require( "./object.includes" );

/**
 * Will use one of the following methods to search for `value` within `object`:
 *
 * - _@futagoza/util/std/array.includes_ (ponyfill for `Array.prototype.includes`)
 * - _@futagoza/util/std/string.includes_ (ponyfill for `String.prototype.includes`)
 * - _@futagoza/util/object.includes_
 *
 * __NOTE:__ `position` is ignored when `object` is a plain JavaScript object.
 *
 * @since 1.0.0-alpha.0
 * @param {Array|String|{}} object An array, plain object or string to search.
 * @param {*} value The value you wish to find within `object`.
 * @param {Number} [position=0] The index at which to begin searching. _Defaults to 0._
 * @returns {void|Boolean} `true` if `value` is found, `void` on incorrect `object`, otherwise `false`
 */
function hasValue( object, value, position ) {

    if ( Array.isArray( object ) ) return arrayIncludes( object, value, position );

    if ( typeof object === "string" ) return stringIncludes( object, value, position );

    if ( isObject( object ) ) return objectIncludes( object, value );

}

module.exports = hasValue;
