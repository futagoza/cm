/*
	based on http://github.com/visionmedia/debug (0.7.2)
*/
var Debugger, color, istty, prevColor, prev, colors, _, VERSION;

// version
VERSION = 0.2;

// required modules
_ = require("./utils");

// Colours
colors = [6, 2, 3, 4, 5, 1];

// Previous debug() call
prev = {};

// Previously assigned colour
prevColor = 0;

// Is stdout a TTY? Coloured output is disabled when `true`
istty = require('tty').isatty(2);

// Select a colour
function color ( ) {
	return colors[prevColor++ % colors.length];
}

// Debugger class
Debugger = function ( name, config ) {
	if ( !config ) config = {};

	// shorthand to auto call the correct debug caller
	function debug ( ) {
		if ( debug.colored ) {
			debug.colour.apply(debug, arguments);
		} else {
			debug.plain.apply(debug, arguments);
		}
	}

	// configure
	debug.timer = config.timer ? config.timer === true : true;
	debug.enabled = config.enable ? config.enable === true : true;
	debug.colored = config.color ? config.color === true : istty;
	debug.prefix = function ( value ) {
		if ( value && _.isString(value) ) name = value;
		return name;
	};

	// format's the way the line is displayed, not the message
	debug.format = function ( name, msg, time ) {
		return name + ' ' + msg + ' ' + time + '';
	};

	// Humanize the given `ms`
	debug.humanize = function ( ms ) {
		var sec = 1000, min = 60 * 1000, hour = 60 * min;
		if ( ms >= hour ) return (ms / hour).toFixed(1) + 'h';
		if ( ms >= min ) return (ms / min).toFixed(1) + 'm';
		if ( ms >= sec ) return (ms / sec | 0) + 's';
		return ms + 'ms';
	};

	// the coloured error displayer
	var c = color();
	debug.colour = function ( fmt ) {
		if ( !debug.enabled ) return;
		var curr = new Date, ms = null;
		if ( debug.timer ) {
			ms = '\u001b[3' + c + 'm' + ' +' + debug.humanize(curr - (prev[name] || curr)) + '\u001b[0m';
		}
		prev[name] = curr;
		fmt = '\u001b[3' + c + 'm\u001b[90m' + fmt + '\u001b[0m';
		fmt = debug.format.call(debug, '\u001b[9' + c + 'm' + name, fmt, ms);
		console.error.apply(this, arguments);
	};

	// displays plain text
	debug.plain = function ( fmt ) {
		if ( debug.enabled ) {
			if ( debug.timer ) {
				fmt = debug.format.call(debug, name, fmt, (new Date()).toUTCString());
			} else {
				fmt = debug.format.call(debug, name, fmt, null);
			}
			console.error.apply(this, arguments);
		}
	};

	// returns the debug function
	return debug;
};

// export
Debugger.Debugger = Debugger;
Debugger.version = VERSION;
module.exports = Debugger;