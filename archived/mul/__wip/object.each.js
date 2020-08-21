"use strict";

const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Will loop through an object's properties calling the given function.
 * 
 * NOTE:
 * This method is just:
 * 
 * ```js
 * // a simplification of:
 * object && Object.keys( object ).forEach( key => {
 *     const value = object[ key ];
 *     // etc...
 * } );
 * 
 * // turned into:
 * each( object, ( value, key ) => {
 *     // etc...
 * } );
 * ```
 * 
 * It is not meant to be compatible with `Array#forEach`, but some methods that
 * don't require the `thisArg` argument for `Array#forEach` should work. If you
 * really need the context use `Function#bind` on the given `iterator`, or just
 * use fat arrows (e.g. `=>`).
 *
 * @since 1.0.0-alpha.0
 * @param {{}} object An object to iterate over.
 * @param {Function} iterator A method to call on each property.
 * @returns {void}
 */
function each( object, iterator ) {

    if ( object == null ) return void 0;

    for ( const key in object ) {

        if ( ! __hasOwnProperty.call( object, key ) ) continue;
        iterator( object[ key ], key );

    }

}

module.exports = each;
