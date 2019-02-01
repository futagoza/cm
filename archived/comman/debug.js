/*
	based on http://github.com/visionmedia/debug (0.7.2)
*/

// required modules
var tty = require( 'tty' ),

    // Colors
    colors = [ 6, 2, 3, 4, 5, 1 ],

    // Previous debug() call
    prev = {},

    // Previously assigned color
    prevColor = 0,

    // Is stdout a TTY? Colored output is disabled when `true`
    isatty = tty.isatty( 2 );

// Select a color
function color() {
    return colors[ prevColor++ % colors.length ];
}

// Humanize the given `ms`
function humanize( ms ) {
    var sec = 1000,
        min = 60 * 1000,
        hour = 60 * min;

    if ( ms >= hour ) return ( ms / hour ).toFixed( 1 ) + 'h';
    if ( ms >= min ) return ( ms / min ).toFixed( 1 ) + 'm';
    if ( ms >= sec ) return ( ms / sec | 0 ) + 's';
    return ms + 'ms';
}

// Create a debugger with the given `name`
function debug( name ) {

    var c = color();
    function colored( fmt ) {
        if ( !colored.enabled ) return;
        var curr = new Date, ms = '';
        if ( colored.timer ) {
            ms = ' +' + humanize( curr - ( prev[ name ] || curr ) );
        }
        prev[ name ] = curr;

        fmt = '  \u001b[9' + c + 'm' + name + ' ' + '\u001b[3' + c +
            'm\u001b[90m' + fmt + '\u001b[3' + c + 'm' + ms + '\u001b[0m';

        console.error.apply( this, arguments );
    }
    colored.timer = true;
    colored.enabled = debug.enabled;

    function plain( fmt ) {
        if ( !plain.enabled ) return;
        fmt = new Date().toUTCString() + ' ' + name + ' ' + fmt;
        console.error.apply( this, arguments );
    }
    plain.enabled = debug.enabled;

    return isatty || process.env.DEBUG_COLORS ? colored : plain;
}

// When true, debug messages are processed
debug.enabled = true;

// Expose `debug()` as the module
module.exports = debug;
