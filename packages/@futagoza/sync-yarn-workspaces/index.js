"use strict";

const { readFileSync, writeFileSync } = require( "fs" );
const { join } = require( "path" );
const getYarnWorkspaces = require( "get-yarn-workspaces" );
const parseJsonWithErrors = require( "json-parse-better-errors" );
const detectIndent = require( "detect-indent" );
const detectNewline = require( "detect-newline" );
const semver = require( "semver" );
const { log, color } = require( "@futagoza/cli-utils" );
const stringifyPackage = require( "stringify-package" );

/**
 * https://github.com/npm/cli/blob/latest/lib/utils/parse-json.js
 * 
 * @param {Buffer|string} content 
 */
function parseJSON( content ) {

    content = content.toString();

    if ( content.charCodeAt( 0 ) === 0xFEFF ) content = content.slice( 1 );

    return parseJsonWithErrors( content );

}

/**
 * Will sync the version of any dependency that is also a workspace package.
 * 
 * __NOTE:__ Only works for the `dependencies` and `devDependencies` fields.
 * 
 * @param {string} from Path to a directory that contans the root `package.json`
 */
function sync( from ) {

    const packages = {};

    function update( workspace, dependencies ) {

        Object.keys( dependencies ).forEach( dependency => {

            if ( ! packages[ dependency ] ) return;

            const version = packages[ dependency ];
            let range = dependencies[ dependency ];

            if ( semver.gtr( version, range ) ) {

                range = version;

                log.info(
                    "Updated dependency", color.cyan( dependency ),
                    "to", color.green( range ),
                    "for", color.yellow( workspace )
                );

            }

            dependencies[ dependency ] = range;

        } );

    }

    getYarnWorkspaces( from )

        .map( path => {

            path = join( path, "package.json" );

            const source = readFileSync( path, "utf8" );
            const data = parseJSON( source );
            const indent = detectIndent( source ).indent;
            const newline = detectNewline( source );

            packages[ data.name ] = data.version;

            return [ path, indent, newline, data ];

        } )

        .forEach( ( [ path, indent, newline, data ] ) => {

            if ( typeof data.dependencies === "object" ) update( data.name, data.dependencies );
            if ( typeof data.devDependencies === "object" ) update( data.name, data.devDependencies );

            writeFileSync( path, stringifyPackage( data, indent, newline ) );

        } );

}

// Exports

module.exports = sync;
module.exports.sync = sync;
module.exports.default = sync;
