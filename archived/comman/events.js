// required modules
var _ = require( './utils' );

// version
exports.version = "1.1";

// event class
var Event = ( function () {
    function Event() {
        this.listeners = this.listeners || [];
    }

    Event.prototype = {
        addListener: function ( listener ) {
            if ( _.isFunction( listener ) ) {
                this.listeners.push( listener );
            }
        },

        emit: function ( context, Arguments ) {
            var size = this.listeners.length;
            if ( size !== 0 ) {
                if ( !context ) context = this;
                if ( !_.isArray( Arguments ) ) {
                    Arguments = Arguments ? [ Arguments ] : [];
                }
                if ( size === 1 ) {
                    this.listeners[ 0 ].apply( context, Arguments );
                } else {
                    _.each( this.listeners, function ( listener ) {
                        listener.apply( context, Arguments );
                    } );
                }
            }
        }
    };

    return Event;
} )();
exports.Event = Event;

// event emitter class
var EventEmitter = ( function () {
    function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || 10;
    }

    // helpers
    function getEvent( emitter, event ) {
        if ( !_.has( emitter._events, event ) ) {
            emitter._events[ event ] = new Event();
        }
        return emitter._events[ event ];
    }
    function countListeners( emitter, event ) {
        if ( !event ) {
            event = emitter;
            emitter = null;
        }
        if ( emitter ) {
            event = getEvent( emitter, event );
        } else {
            if ( !( event instanceof Event ) ) {
                return 0;
            }
        }
        return event.listeners.length;
    }

    EventEmitter.prototype = {
        setMaxListeners: function ( n ) {
            if ( !_.isNumber( n ) || n < 0 ) {
                throw new TypeError( 'n must be a positive number' );
            }
            this._maxListeners = n;
        },

        addListener: function ( event, listener ) {
            var maxListeners = this._maxListeners;
            event = getEvent( this, event );
            if ( !event.warned && maxListeners && maxListeners > 0 ) {
                if ( countListeners( event ) > maxListeners ) {
                    event.warned = true;
                    console.error( 'This EventEmitter only accepts %d listeners!', maxListeners );
                    console.trace();
                }
            }
            if ( !event.warned ) {
                event.addListener( listener );
            }
            return this;
        },

        once: function ( event, listener ) {
            if ( _.isFunction( listener ) ) {
                this.addListener( event, function cb() {
                    listener.apply( this, arguments );
                    this.removeListener( event, cb );
                } );
            }
            return this;
        },

        removeListener: function ( event, listener ) {
            var listeners = getEvent( this, event ).listeners, i;
            if ( listeners.length > 0 ) {
                for ( i = 0; i < listeners.length; i++ ) {
                    if ( listener === listeners[ i ] ) {
                        listeners.splice( i, 1 );
                        break;
                    }
                }
            }
            return this;
        },

        removeAllListeners: function ( event ) {
            if ( arguments.length === 0 ) {
                this._events = {};
            } else {
                getEvent( this, event ).listeners = [];
            }
            return this;
        },

        listeners: function ( event ) {
            return getEvent( this, event ).listeners.slice();
        },

        emit: function ( event ) {
            getEvent( this, event ).emit( this, _.slice( arguments, 1 ) );
        }
    };

    // shortcuts and Node.js compatibility
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.listenerCount = countListeners;

    return EventEmitter;
} )();
exports.EventEmitter = EventEmitter;
