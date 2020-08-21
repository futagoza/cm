"use strict";

/**
 * @private
 * @param {Array} $source
 * @param {Array} $target
 * @param {Number} $depth
 * @param {Function} [callback]
 * @returns {Array}
 */
function flattenToArray( $source, $target, $depth, callback ) {

    const $length = $source.length;
    const $next = $depth === 0 ? false
                : $depth === -1 ? -1
                : $depth - 1;

    let $i, $value;
    for ( $i = 0; $i < $length; ++$i ) {

        $value = $source[ $i ];

        if ( callback ) $value = callback( $value, $i, $source );

        if ( Array.isArray( $value ) && $next !== false )

            flattenToArray( $value, $target, $next, callback );

        else

            $target[ $target.length ] = $value;

    }

    return $target;

}

module.exports = flattenToArray;
