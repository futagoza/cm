"use strict";

/**
 * Calculates the percentage of `current` _(n)_ out of `max` _(100)_.
 *
 * @since 1.0.0-alpha.0
 * @param {Number} current The current number value.
 * @param {Number} max The maximum number value.
 * @param {Number} [fix] Returns a number in fixed-point notation.
 * @returns {Number} The percentage.
 */
function percentage( current, max, fix ) {

    const percentage = ( Math.abs( current / max ) * 100 ) || 0;
    return fix ? parseFloat( percentage.toFixed( fix ) ) : percentage;
}

module.exports = percentage;
