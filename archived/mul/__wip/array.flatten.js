"use strict";

const flattenToArray = require( "./internal/flattenToArray" );

const __flat = Array.prototype.flat;
const __flatMap = Array.prototype.flatMap;

/**
 * Ponyfill++ of `Array#flat` and `Array#flatMap`.
 * 
 * Depending on `depth` this method:
 * 
 * - Flattens `source` a single level deep _(default)_.
 * - Recursively flattens `source` up to `depth` times.
 * - Recursively flattens `source` when `depth` is `-1`.
 * 
 * If a function is passed as the 2nd argument, it will be used to change the
 * value before it is added to the array that is returned:
 * 
 * ```js
 * flatten( [ "elements", 0.1, "name" ], v => {
 *     if ( typeof v !== "string" ) v = String( v );
 *     return v.split( "." );
 * } );
 * ```
 *
 * @since 1.0.0-alpha.0
 * @param {Array} source An array to flatten.
 * @param {Function} [cb] An optional function to alter the orignal element.
 * @param {Number} [depth=1] The depth you wish to flatten up to. _Defaults to 1._
 * @returns {Array} Flattened array.
 */
function flatten( source, cb, depth ) {

    if ( typeof cb !== "function" ) {

        depth = cb;
        cb = false;

    }

    if ( typeof depth !== "number" ) depth = 1;

    return __flat && ! cb && depth > 0 ? __flat.call( source, depth )
        : __flatMap && cb && depth === 1 ? __flatMap.call( source, cb )
        : flattenToArray( source, [], depth, cb );

}

module.exports = flatten;
