"use strict";

const p = require( "./platform" );

/**
 * Returns the current high-resolution real time in a `[seconds, nanoseconds]` tuple Array.
 * 
 * On non-Node enviroments this is a polyfill using either `performance.now` or  `Date.now`
 *
 * @since 1.0.0-alpha.0
 * @type {(time?: number[]) => number[]}
 */
module.exports = p.process.hrtime || hrtime;

// 
// This is a tweaked copy/paste of https://github.com/kumavis/browser-process-hrtime
// 

// polyfil for window.performance.now
const performance = p.window.performance || {};
const now =
    performance.now ||
    performance.mozNow ||
    performance.msNow ||
    performance.oNow ||
    performance.webkitNow ||
    Date.now ||
    function now() {

        return ( new Date() ).getTime();

    };

/**
 * Polyfill for http://nodejs.org/api/process.html#process_process_hrtime
 *
 * @private
 * @param {number[]} [time]
 * @returns {number[]}
 */
function hrtime( time ) {

    const clocktime = now.call( performance ) * 1e-3;
    let seconds = Math.floor( clocktime );
    let nanoseconds = Math.floor( ( clocktime % 1 ) * 1e9 );
    if ( time ) {

        seconds -= time[ 0 ];
        nanoseconds -= time[ 1 ];
        if ( nanoseconds < 0 ) {

            seconds--;
            nanoseconds += 1e9;

        }

    }
    return [ seconds, nanoseconds ];

}
