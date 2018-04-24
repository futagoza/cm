// expose's a module to 'exports'
function expose ( name, path, property ) {
	exports.__defineGetter__(name, function(){
		if ( property ) {
			return require(path)[property];
		} else {
			return require(path);
		}
	});
}
// expose("", './', '');

// core modules
expose("argv",        './argv.js');
expose("cache",       './cache.js');
expose("coffee",      './coffee');
expose("debug",       './debug.js');
expose("events",      './events.js');
expose("expose-dir",  './expose-dir.js');
expose("fs",          './fs.js');
expose("jsondb",      './jsondb.js');
expose("tpl",         './tpl.js');
expose("utils",       './utils.js');

// major modules
expose("app",     './app');
expose("ts",      './ts');

// shortcuts
expose("App",     './app');
expose("Debugger",         './debug.js',   'Debugger');
expose("Event",            './events.js',  'Event');
expose("EventEmitter",     './events.js',  'EventEmitter');
expose("EventDispatcher",  './events.js',  'EventDispatcher');
expose("expose",           './expose-dir.js');

// required modules, exposed for convenience
expose("CoffeeScript",  'coffee-script');
expose("mkdirp",        'mkdirp');
expose("shelljs",       'shelljs');
expose("TypeScript",    'typescript');
expose("UglifyJS",      'uglify-js');