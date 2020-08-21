"use strict";

/**
 * @private
 */
class IterableVistor {

    /**
     * @param {{}|Array} object
     * @param {Function} iterator
     */
    constructor( object, iterator ) {

        this.object = object;
        this.iterator = iterator;
        this.count = 0;

        this.pair = iterator.length !== 1;

    }

    /**
     * @param {Number|String} key
     * @returns {*}
     */
    visit( key ) {

        ++this.count;

        const iterator = this.iterator;
        const value = this.object[ key ];

        if ( this.pair ) {

            iterator( key, value );
            return void 0;

        }

        const entry = [ key, value ];
        entry.count = this.count;
        entry.key = key;
        entry.value = value;
        entry.source = this.object;

        Object.freeze( entry );

        return iterator( entry );

    }

}

module.exports = IterableVistor;
