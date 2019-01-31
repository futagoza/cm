// Based on https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/pump/index.d.ts

/// <reference types="node" />

/**
 * The done function, called when all streams are either finished or there was an error.
 * 
 * @param err If there was an error from one of the streams, this will be it. 
 */
type PumpCallback = ( err?: Error ) => any;

/**
 * An object type that can be handled by _pump_ or _stream.pipeline_
 */
type PumpStream = NodeJS.ReadableStream | NodeJS.WritableStream;

/**
 * An object type that can be handled by _@futagoza/pump_
 */
type PumpEntry = PumpStream | Promise<any> | Function;

/**
 * Pipe streams together and close all of them if one of them closes.
 * 
 * @param streams An array of Node streams.
 * @param callback A function called when all streams are done or there was an error.
 */
declare function pipeline( streams: PumpStream[], callback ?: PumpCallback ): PumpStream[];

/**
 * Pipe streams together and close all of them if one of them closes.
 * 
 * __NOTE:__ The _callback_ must be passed as the last argument.
 * 
 * @param streams An array of Node streams.
 */
declare function pipeline( ...streams: Array<PumpStream | PumpCallback> ): PumpStream[];

/**
 * Will wrap `pump` in a Promise, as well as change any promise's and functions to streams.
 * 
 * @param args Streams, functions and/or promises.
 */
declare function pump( ...args: PumpEntry[] ): Promise<any>;

/**
 * Will wrap `pump` in a Promise, as well as change any promise's and functions to streams.
 * 
 * @param args An array of Streams, functions and/or promises.
 */
declare function pump( args: PumpEntry[] ): Promise<any>;

/**
 * Will wrap `pump` in a Promise, as well as change the promise or function into a stream.
 * 
 * __NOTE:__ It's not adviced you use this, unless you are not sure weather your dealing with a
 * single entry or multiple entries.
 * 
 * @param entry A Stream, function or promise.
 */
declare function pump( entry: PumpEntry ): Promise<any>;

//Exports

export default pump;
export = { pump, pipeline };
