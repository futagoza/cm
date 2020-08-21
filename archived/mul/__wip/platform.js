"use strict";

/* globals window, document */

const nameof = require( "./nameof" );

const GLOBAL = typeof global === "undefined" ? false : global;
const PROCESS = typeof process === "undefined" ? false : process;
const WINDOW = typeof window === "undefined" ? false : window;
const DOCUMENT = typeof document === "undefined" ? false : document;

const isBrowser = ( WINDOW && DOCUMENT ) && WINDOW.document === DOCUMENT;
const isNode = ( GLOBAL && PROCESS ) && nameof( PROCESS, "process" );

module.exports = {

    /**
     * Is this a browser-like enviroment?
     * 
     * @since 1.0.0-alpha.0
     */
    get browser() {

        return !! isBrowser;

    },

    /**
     * Is this a Node-like enviroment?
     *
     * @since 1.0.0-alpha.0
     */
    get node() {

        return !! isNode;

    },

    /**
     * The `global` object. On the browser this is the `window` object.
     *
     * @since 1.0.0-alpha.0
     * @type {global|window}
     */
    get global() {

        return GLOBAL || WINDOW || {};

    },

    /**
     * On a Node-like enviroment, this is the `process` object, otherwise its just a plain object.
     *
     * @since 1.0.0-alpha.0
     * @type {process}
     */
    get process() {

        return PROCESS || {};

    },

    /**
     * The `window` object. On non-browser envirments this is either `global` or `{}`
     *
     * @since 1.0.0-alpha.0
     * @type {window}
     */
    get window() {

        return WINDOW || ( GLOBAL ? GLOBAL.window : {} ) || {};

    },

    /**
     * On a browser-like enviroment, this is the `document` object, otherwise its just a plain object.
     *
     * @since 1.0.0-alpha.0
     * @type {document}
     */
    get document() {

        return DOCUMENT || {};

    },

};
