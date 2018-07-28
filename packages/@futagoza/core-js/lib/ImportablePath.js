"use strict";

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 *
 * Return's the `require`able path for `N`.
 * 
 * @param {String} N A module or file name
 * @returns {String} `"@futagoza/core-js/" + N`
 */
function ImportablePath( N ) {

    return "@futagoza/core-js/" + N;

}

module.exports = ImportablePath;
