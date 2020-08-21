"use strict";

const each = require( "./object.each" );

const emptyString = () => "";

/**
 * A user friendly version of `String.prototype.replace` based on PHP's `str_replace`
 *
 * @since 1.0.0-alpha.0
 * @param {String} data The string to change.
 * @param {{}} content A map of `{ [oldValue]: newValue }`
 * @returns {String} The updated string
 */
function replace( data, content ) {

    each( content, function update( newValue, oldValue ) {

        if ( ! ( oldValue instanceof RegExp ) ) oldValue = new RegExp( oldValue, "g" );
        if ( newValue === "" || newValue == null ) newValue = emptyString;

        data = data.replace( oldValue, newValue );

    } );

    return data;

}

module.exports = replace;
