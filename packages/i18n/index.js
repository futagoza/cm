import i18nENLocale from "./locales/en.js"

/**
 * Private object that contains the shared store for all library locales
 * 
 * library-id <language-id <message-id message-template>>
 * 
 * @type {Record<PropertyKey, Record<PropertyKey, Record<PropertyKey, string>>>}
 */

const _globalStore = {}

/**
 * A private utility to create immutable properties on the private `_globalStore`
 * 
 * @type {(object: {}, key: PropertyKey, value: unknown) => void}
 */

function _define( object, key, value ) {

    Object.defineProperty( object, key, {
        configurable: false,
        writable: false,
        value,
    } )

}

/**
 * Private function to build a formatted error message for `@futagoza/i18n`
 * 
 * @param {PropertyKey} id 
 * @param {string[]} [replacements] 
 */

function _error( id, ...replacements ) {

    return new Error( FormatMessage( ResolveMessage( "@futagoza/i18n", i18n.language, id ), replacements ?? {} ) )

}

/**
 * Checks if `library` is registered
 * 
 * @param {PropertyKey} library Name of the library to check
 */

export function isLibrary( library ) {

    return Object.hasOwn( _globalStore, library )

}

/**
 * Checks if `library/language` is registered
 * 
 * @param {PropertyKey} library Name of the library to check
 * @param {PropertyKey} language Language locale to ensure exists
 */

export function isLocale( library, language ) {

    return _globalStore[ library ] && Object.hasOwn( _globalStore[ library ], language )

}

/**
 * Ensures the `library/language` locale exists in the shared locale store, then returns it
 * 
 * @param {PropertyKey} library Name of the library that imported `@futagoza/i18n`
 * @param {PropertyKey} language Language locale to ensure exists
 */

export function GetLocale( library, language ) {

    if ( ! isLibrary( library ) ) _define( _globalStore, library, {} )
    if ( ! isLocale( library, language ) ) _define( _globalStore[ library ], language, {} )

    return _globalStore[ library ][ language ]

}

/**
 * Add's messages to the given `library/language` locale.
 * 
 * _**NOTE:** THIS WILL OVERWRITE ANY PREVIOUSLY STORED MESSAGE(s)_
 * 
 * @param {PropertyKey} library Name of the library that imported `@futagoza/i18n`
 * @param {PropertyKey} language Language locale to add messages to
 * @param {Record<PropertyKey, string>} messages (assumed) plain object of `message-id: message-template`
 */

export function SetLocale( library, language, messages ) {

    const locale = GetLocale( library, language )

    for ( const [ id, template ] of Object.entries( messages ) ) {

        locale[ id ] = template

    }

}

/**
 * Will perform `message.replaceAll` for each property in `replacements`
 * 
 * If `replacements` is an array, will auto-generate keys based on array index prefixed with `$`:
 * 
 * ```js
 * FormatMessage( "$0 there", [ "Hi" ] ) // Hi there
 * ```
 * 
 * @param  {string} message 
 * @param  {Record<string,string>|string[]} replacements 
 */

export function FormatMessage( message, replacements ) {

    if ( typeof message !== "string" ) throw _error( "ARGUMENT_MUST_BE_A_STRING", "1st", "@futagoza/i18n#FormatMessage" )
    if ( Array.isArray( replacements ) ) {

        const args = {}
        replacements.forEach( ( value, index ) => {

            args[ "$" + index ] = value

        } )
        replacements = args

    } else if ( typeof replacements !== "object" ) throw _error( "ARGUMENT_MUST_BE_A_HASH", "2nd", "@futagoza/i18n#FormatMessage" )

    let result = message

    for ( const [ key, value ] of Object.entries( replacements ) ) {

        result = result.replaceAll( key, value )

    }

    return result

}

/**
 * Retrive message from the asked `library/language` locale.
 * 
 * @param {PropertyKey} library Name of the library that imported `@futagoza/i18n`
 * @param {PropertyKey} language Language locale to retrive message data from
 * @param {PropertyKey} id Key for the message to retrive
 * @param {string} [defaultValue] fallback message to use (defaults to: `library#language: id`)
 */

export function ResolveMessage( library, language, id, defaultValue ) {

    if ( ! isLibrary( library ) ) throw _error( "LIBRARY_NOT_REGISTERED", library )
    if ( ! isLocale( library, language ) ) throw _error( "LOCALE_NOT_REGISTERED", library, language )

    return _globalStore[ library ][ language ][ id ]
        ?? defaultValue
        ?? `${ library }#${ language }: ${ id }`

}

/**
 * Register many locales (e.g. `{ en: { ...engMessages }, jp: { ...jpnMessages } }`) all at once for `library`
 * 
 * A function will be returned that retrieves (and formats) the requested message from `library/locale` with the locale being the
 * synced locale language for all libraries (assigned at `i18n.language`); to get a specific language locale use `ResolveMessage`
 * 
 * @param {string} library Name of the library that called this method
 * @param {Record<PropertyKey, Record<PropertyKey, string>>} locales language locales to register
 */

export function i18n( library, locales ) {

    if ( typeof library !== "string" ) throw _error( "ARGUMENT_MUST_BE_A_STRING", "1st", "@futagoza/i18n#i18n" )
    if ( typeof locales !== "object" ) throw _error( "ARGUMENT_MUST_BE_A_HASH", "2nd", "@futagoza/i18n#i18n" )

    for ( const [ language, messages ] of Object.entries( locales ) ) SetLocale( library, language, messages )

    /**
     * @param {PropertyKey} id
     * @param {string[]} [args]
     */
    return ( id, ...args ) => FormatMessage( ResolveMessage( library, i18n.language, id ), args )

}

export default i18n

/**
 * Synced locale language for all libraries that use `@futagoza/i18n#i18n()( ...args )`
 */

i18n.language = "en"

// set-up locales for this package
SetLocale( "@futagoza/i18n", "en", i18nENLocale )
SetLocale( "@futagoza/i18n", "eng", i18nENLocale )
