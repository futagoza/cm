"use strict";

/**
 * Will confirm if the given `value` is a ES2015 Promise.
 * 
 * __NOTE:__ This is deliberatly not strict so that any object containing the methods `then` and
 * `catch` will pass as a Promise. The reason for this is because sometimes it's useful creating
 * a Promise-like object that has more methods then the native Promise class, but also contains
 * the Promise's instance methods wrapped around the orignal Promise.
 * 
 * @since 1.0.0-alpha.0
 * @param {*} value The object to check.
 * @returns {Boolean} Will be `true` on a Promise.
 */
function isPromise( value ) {

    return typeof value === "object"
        && typeof value.catch === "function"
        && typeof value.then === "function";

}

module.exports = isPromise;
