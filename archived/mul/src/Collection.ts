/**
 * A simple class that is like a `Set` but allows multiple copies of an object.
 */

export default class Collection<T> extends Array<T> {

    /**
     * Add an entry to the collection.
     */

    add( value: T ) {

        this[ this.length ] = value;

        return this;

    }

    /**
     * Clear the collection.
     */

    clear() {

        while ( this.length !== 0 ) this.pop();

        return this;

    }

    /**
     * Remove `value` from this collection if present
     */

    delete( value: T ) {

        const index = this.indexOf( value );

        if ( index !== -1 ) delete this[ index ];

        return this;

    }

    /**
     * Check if the collection has `value`
     */

    has( value: T ) {

        return this.includes( value );

    }

    /**
     * Same as `Array#length`.
     */

    get size() {

        return this.length;

    }

}
