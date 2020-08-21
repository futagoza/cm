"use strict";

const BasicEvent = require( "./BasicEvent" );

class SyncEvent extends BasicEvent {

    /**
     * Will execute all the subscribed listeners.
     */
    fire() {

        const listeners = this._listeners;
        const count = listeners.length;

        for ( let i = 0; i < count; i++ ) listeners[ i ]();

        return this;

    }

}

module.exports = SyncEvent;
