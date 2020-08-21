"use strict";

const isString = require( "../isString" );

/**
 * Indent each line in a string.
 *
 * @since 1.0.0-alpha.0
 * @param {String} input A string to indent.
 * @param {String} [indent] A string to use as indention _(default is 2 spaces)_.
 * @param {String|RegExp} [splitby] Characters used to split the string _(default is new line chars)_.
 * @returns {String} A indented copy of `input`.
 */
function indent( input, indent, splitby ) {

    if ( ! isString( indent ) ) indent = "  ";
    if ( splitby == null ) splitby = /\r?\n|\r/g;

    return input.replace( splitby, line => line + indent );

}

module.exports = indent;
