"use strict";

const BasicEvent = require( "./BasicEvent" );
const defer = require( "@futagoza/util/defer" );
const poll = require( "@futagoza/util/poll" );

class AsyncEvent extends BasicEvent {

    /**
     * Will execute all the subscribed listeners.
     */
    fire() {

        const listeners = this._listeners;
        const count = listeners.length;
        let i = 0;

        function next( error, result ) {

            if ( i === count ) return void 0;

            poll.add( defer( listeners[ i++ ], next ) );

        }

        next();
        return this;

    }

}

module.exports = AsyncEvent;
