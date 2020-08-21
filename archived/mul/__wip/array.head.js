"use strict";

const __slice = Array.prototype.slice;

/**
 * Get a copy of `source` that does not contain the last `n` element(s).
 * 
 * By default, this is an alias for `source.slice( 0, -1 )`
 *
 * @since 1.0.0-alpha.0
 * @param {Array} source The array to work with.
 * @param {Number} [n] The number of elements at the end not to include _(default is `1`)_
 * @returns {Array} Updated copy of `source`.
 */
function head( source, n ) {

    return __slice.call( source, 0, n == null ? -1 : Number( "-" + n ) );

}

module.exports = head;
