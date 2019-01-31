"use strict";

/**
 * Return's a new rejected promise for a `@futagoza/publish-package` error.
 *
 * @param {Error} error The error object.
 * @param {{}} [details] Additional properties to add to the error.
 * @returns {Promise<Error>} A rejected promise.
 */
function reject( error, details ) {

    error.from = "@futagoza/publish-package";
    error.isPublishError = true;

    if ( details ) Object.assign( error, details );

    return Promise.reject( error );

}

module.exports = reject;
