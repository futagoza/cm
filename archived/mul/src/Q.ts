import Aigle from "aigle";
import { AsyncCallback } from "./types";
import Collection from "./Collection";

// 
// Used by `Q.for`
// 

const _locked = new WeakMap<object, Collection<AsyncCallback>>();

const _stack = new WeakMap<object, Promise<unknown>>();

/**
 * A simple class to collect async functions to run in series or parallel.
 */

export class Q extends Collection<AsyncCallback> {

    /**
     * Execute the async functions; either in series or parallel.
     */

    async run( limit?: number ) {

        if ( this.length < 0 ) return Aigle.resolve( void 0 as unknown );

        if ( limit ) return Aigle.parallelLimit( this, limit );

        return Aigle.series( this );

    }

    static async for( target: object, task: AsyncCallback ) {

        let locked = false;

        async function run( collection: Collection<AsyncCallback> ) {

            for await ( const task of collection ) {

                await task( target );

            }

        }

        if ( _locked.has( target ) ) {

            const collection = _locked.get( target );

            if ( collection instanceof Collection ) {

                collection.add( task );
                return Aigle.resolve();

            }

            _locked.delete( target );

        }

        const collection = new Collection( task );
        _locked.set( target, collection );

        for await ( const task of collection ) {

            await task( target );

        }

    }

    static next( target: object, task: AsyncCallback ) {

        let fn = _stack.get( target );

        if ( fn ) {

            fn = fn.then( () => task( target ) );

        } else {

            fn = task( target );

        }

        _stack.set( target, fn );

        return fn;

    }

}
