"use strict";

// 
// This file is just an easier way for me to understand `process.nextTick` and `setImmediate`,
// without worring if they work on both browsers and Node.js by ponyfilling them. 
// 
// Also helped:
// 
//   - The majority of this file is a tweaked version of https://github.com/yuzujs/setImmediate
//   - https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#process-nexttick
//   - https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#process-nexttick-vs-setimmediate
// 

/**
 * By default, this is a reference to `process.nextTick`, but if this file is executed in an
 * enviroment other then Node.js then it should use `setImmediate` or use a ponyfill.
 * 
 * - `process.nextTick()` fires immediately on the same phase
 * - `setImmediate()` fires on the following iteration or 'tick' of the event loop
 *
 * @since 1.0.0-alpha.0
 * @type {(callback: Function, ...args?: Array) => void}
 */
exports.next = typeof process !== "undefined" ? process.nextTick : void 0;

/**
 * A reference to `setImmediate`; fires on the following iteration or 'tick' of the event loop.
 *
 * @since 1.0.0-alpha.0
 * @type {(callback: Function, ...args?: Array) => number}
 */
exports.add = typeof setImmediate === "function" ? setImmediate : void 0;

/**
 * A reference to `clearImmediate`; clears the action specified by `setImmediate`.
 *
 * @since 1.0.0-alpha.0
 * @type {(handle: number) => void}
 */
exports.clear = typeof clearImmediate === "function" ? clearImmediate : void 0;

/**
 * Are `setImmediate` (`poll.add`) and `clearImmediate` (`poll.clear`) ponyfilled?
 *
 * @since 1.0.0-alpha.0
 * @type {Boolean}
 */
exports.ponyfilled = ( () => {

    // We want the native versions if possible
    if ( exports.add && exports.clear ) {

        if ( typeof exports.next !== "function" ) exports.next = setImmediate;
        return false;

    }

    let nextHandle = 1; // Spec says greater than zero
    const tasksByHandle = {};
    let currentlyRunningATask = false;
    let registerImmediate; // set below

    function customSetImmediate( callback ) {

        let args = void 0;
        const argc = arguments.length;
        if ( argc > 1 ) {

            args = [];
            for ( let i = 1; i < argc; ++i ) args[ i ] = arguments[ i ];

        }

        tasksByHandle[ nextHandle ] = { callback, args };
        registerImmediate( nextHandle );
        return nextHandle++;

    }

    function customClearImmediate( handle ) {

        delete tasksByHandle[ handle ];

    }

    function executeCallback( handle ) {

        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if ( currentlyRunningATask ) {

            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout( executeCallback, 0, handle );

        } else {

            const task = tasksByHandle[ handle ];
            if ( task ) {

                currentlyRunningATask = true;
                try {

                    if ( task.args )

                        task.callback.apply( void 0, task.args );

                    else

                        task.callback();

                } finally {

                    customClearImmediate( handle );
                    currentlyRunningATask = false;

                }

            }

        }

    }

    function canUsePostMessage() {

        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if ( global.postMessage && ! global.importScripts ) {

            let postMessageIsAsynchronous = true;
            const oldOnMessage = global.onmessage;
            global.onmessage = function sync() {

                postMessageIsAsynchronous = false;

            };
            global.postMessage( "", "*" );
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;

        }

    }

    if ( canUsePostMessage() ) {

        // For non-IE10 modern browsers

        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        const messagePrefix = "setImmediate$" + Math.random() + "$";
        function onGlobalMessage( event ) {

            const d = event.data;
            if ( event.source === global && typeof d === "string" && d.indexOf( messagePrefix ) === 0 ) {

                executeCallback( +d.slice( messagePrefix.length ) );

            }

        }

        if ( global.addEventListener ) {

            global.addEventListener( "message", onGlobalMessage, false );

        } else {

            global.attachEvent( "onmessage", onGlobalMessage );

        }

        registerImmediate = function postMessageImplementation( handle ) {

            global.postMessage( messagePrefix + handle, "*" );

        };

    } else if ( global.MessageChannel ) {

        // For web workers, where supported

        const channel = new global.MessageChannel();

        channel.port1.onmessage = function listener( event ) {

            const handle = event.data;
            executeCallback( handle );

        };

        registerImmediate = function messageChannelImplementation( handle ) {

            channel.port2.postMessage( handle );

        };

    } else {

        // Fallback for anything else

        registerImmediate = function setTimeoutImplementation( handle ) {

            setTimeout( executeCallback, 0, handle );

        };

    }

    if ( typeof exports.next !== "function" ) exports.next = customSetImmediate;
    exports.add = customSetImmediate;
    exports.clear = customClearImmediate;

    return true;

} )();
