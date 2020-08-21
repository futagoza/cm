"use strict";

/**
 * Will confirm if the given `value` is a ES2015 Promise.
 * 
 * __NOTE:__ This is deliberatly not strict so that any object containing the methods `then` and
 * `catch` will pass as a Promise. The reason for this is because sometimes it's useful creating
 * a class that extendeds the Promise API.
 * 
 * @param {*} value The object to check.
 */

function isPromise( value ) {

    return typeof value !== "undefined"
        && typeof value.catch === "function"
        && typeof value.then === "function";

}

module.exports = isPromise;
