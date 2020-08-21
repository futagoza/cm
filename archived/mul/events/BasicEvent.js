"use strict";

class BasicEvent {

    constructor() {

        /** @type {(()=>void)[]} */
        this._listeners = [];

    }

    /**
     * Return the number of listeners that have subscribed to this event.
     */
    get count() {

        return this._listeners.length;

    }

    /**
     * Add a listener to this event.
     * 
     * @param {()=>void} listener The function to add to this event.
     */
    subscribe( listener ) {

        this._listeners[ this.count ] = listener;
        return this;

    }

    /**
     * Remove the given listener from this event if found.
     * 
     * @param {()=>void} listener The function to search for.
     */
    unsubscribe( listener ) {

        const listeners = this._listeners;
        const count = listeners.length;

        for ( let i = 0; i < count; i++ ) {

            if ( listeners[ i ] !== listener ) continue;

            listeners.splice( i, 1 );
            break;

        }

        return this;

    }

}

module.exports = BasicEvent;
