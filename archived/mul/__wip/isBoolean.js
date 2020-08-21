"use strict";

/**
 * Will confirm if the given `value` is a boolean.
 *
 * @since 1.0.0-alpha.0
 * @param {*} value The object to check.
 * @returns {Boolean} Will be `true` on a boolean.
 */
function isBoolean( value ) {

    return typeof value === "boolean";

}

module.exports = isBoolean;
