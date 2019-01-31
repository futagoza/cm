"use strict";

/**
 * Will iterate over an object's properties, buiding a valid `argv` for `npm/yarn publish`.
 * 
 * __NOTE:__ This method assumes that all properies have a _string_ value (or a _boolean_ for flags), so
 * no type coercion or validation is performed.
 * 
 * @param {{}} [options] An object containing the options to translate to args.
 * @returns {String[]} An array of strings to use as the `argv` for NPM or Yarn.
 */
function buildArgv( options = {} ) {

    const args = [ "publish" ];

    for ( const key of Object.keys( options ) ) {

        const value = options[ key ];

        switch ( key ) {

            case "access":
                args.push( "--access", value );
                break;

            case "dry-run":
            case "dry":
            case "dryRun":
                if ( value === true ) args.push( "--dry-run" );
                break;

            case "new-version":
            case "newVersion":
            case "version":
                args.push( "--new-version", value );
                break;

            case "otp":
            case "otpcode":
                args.push( "--otp", value );
                break;

            case "public":
            case "scoped":
                args.push( "--access", "public" );
                break;

            case "registry":
            case "reg":
                args.push( "--registry", value );
                break;

            case "restricted":
            case "private":
                args.push( "--access", "restricted" );
                break;

            case "tag":
                args.push( "--tag", value );
                break;

        }

    }

    return args;

}

module.exports = buildArgv;
