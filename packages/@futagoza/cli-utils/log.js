"use strict";

const chalk = require( "chalk" );
const dateformat = require( "dateformat" );

/**
 * Console logging functions.
 */
const log = {

    color: chalk,

    /**
     * Append either the given time, or if none provided, the current time.
     * 
     * @param {Date} [time] An optional JavaScript Date instance.
     * @param {String} [color] The color to use on the appended date (default is _grey_).
     */
    appendTime( time = new Date(), color = "grey" ) {

        if ( typeof time === "string" ) {

            color = time;
            time = new Date();

        }

        color = log.color[ color ] || "grey";

        time = "[" + color( dateformat( time, "HH:MM:ss" ) ) + "]";
        process.stdout.write( time + " " );

    },

    /**
     * Prettily log information to the console.
     * 
     * Based on https://github.com/stevelacy/plugin-log
     */
    info( ...data ) {

        log.appendTime();
        console.log( ...data );

    },

    /**
     * Prettily log a warning to the console.
     * 
     * Based on https://github.com/stevelacy/plugin-log
     */
    warning( ...data ) {

        log.appendTime( "yellow" );
        console.log( ...data );

    },

    /**
     * Prettily log an error to the console.
     * 
     * Based on https://github.com/stevelacy/plugin-log
     */
    error( ...data ) {

        log.appendTime( "red" );
        console.error( ...data );

    },

};

module.exports = log;
