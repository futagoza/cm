// utils
var _ = require("./utils");
function isShort ( arg ) { return arg.indexOf("-") === 0; }
function isLong ( arg ) { return arg.indexOf("--") === 0; }

// node main argv
var nodeArgv = process.argv.slice(2);

// node-argv parser
function parse ( argv ) {
	if ( !argv ) argv = nodeArgv;
	if ( !_.isArray(argv) ) throw TypeError("`argv` argument must be a array!");
	
	var args = {}, list = [], skip;
	
	argv.forEach(function(arg, i){
		if ( skip ) {
			skip = false; return;
		}
		
		if ( isLong(arg) ) {
			args[arg.slice(2)] = argv[i + 1];
			skip = true; return;
		}
		
		if ( isShort(arg) ) {
			args[arg.slice(1)] = true; return;
		}
		
		list.push(arg);
	});
	
	return {
		argv: args,
		length: argv.length,
		list: list,
		on: function ( arg, callback ) {
			return parse.on(argv, arg, callback) || parse.on(args, arg, callback) || parse.on(list, arg, callback);
		}
	};
}

// if the given arg is in argv, call the callback if one is given and return true
parse.on = function ( argv, arg, callback ) {
	var i, n;
	
	if ( arguments.length == 2 ) {
		callback = arg;
		arg = argv;
		argv = nodeArgv;
	}

	if ( _.isArray(arg) ) {

		for ( n = 0; n < arg.length; n++ ) {
			if ( parse.on(argv, arg[n], callback) ) break;
			else i = -1;
		}

	} else {

		if ( argv ) {
			if ( _.isArray(argv) ) {

				i = argv.indexOf(arg);
				if ( i !== -1 && _.isFunction(callback) ) {
					if ( !isLong(arg) ) callback();
					else callback(argv[i + 1]);
				}

			} else {

				for ( i in argv ) {
					if ( _.has(argv, i) && i == arg ) callback(argv[i]);
					else i = -1;
				}
				
			}
		}

	}

	return i !== -1;
};

// export
parse.argv = nodeArgv;
parse.parse = parse;
parse.isShort = isShort;
parse.isLong = isLong;
module.exports = parse;