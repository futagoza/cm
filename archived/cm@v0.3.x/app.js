// required modules
var _ = require('./utils'),
    fs = require('./fs'),
    Debugger = require("./debug"),
    EventEmitter = require("./events").EventEmitter;

// export and main variable
var Application = exports = module.exports = function ( options ) {
	if ( !(this instanceof Application) ) {
		return new Application(options);
	}
	options = options || {};
	EventEmitter.call(this);
	this.init(options);
	delete this.init;
};
_.inherits(Application, EventEmitter);

Application.startApp = function ( options ) {
	return new Application(options);
};

// starts a new application
Application.prototype.init = function ( options ) {
	options = options || {};
	this.settings = {};
	this.middleware = {};

	this.id = _.uid(options.idLength || 15, options.idDictionary);
	this.appName = options.name || 'Anonymous Application';
	this.debug = new Debugger(this.appName, { timer: false });

	if ( _.isObject(options.settings) ) {
		_.each(options.settings, this.set, this);
	}

	this.root = options.root || fs.dirname(module.parent.filename);
	if ( !fs.existsSync(this.root) ) {
		this.debug("root path '%s' doesn't exist!", this.root);
		delete this.root;
	}

	if ( !this.defined('env') ) {
		this.set('env', options.env || process.env.NODE_ENV || 'development');
	}
	this.debug('booting in %s mode', this.get('env'));
	
	this.on('error', function(err){
		if ( !_.isString(err) ) return;
		this.debug('ERROR: %s', err);
	});
	this.on('use', function(name){
		this.debug("loaded middleware '%s'", name);
	});
	this.on('mount', function(parent){
		this.debug("mounted '%s' to '%s'", this.appName, parent.appName);
	});
	this.emit('init', this);
};

// checks if the given middleware is loaded
Application.prototype.using = function ( name ) {
	return _.has(this.middleware, name);
};

// loads the given middleware
Application.prototype.use = function ( fn ) {
	if ( fn.use && fn.using ) {
		fn.parent = this;
		fn.emit('mount', this);
	} else {
		var name = fn.name;
		if ( _.isFunction(fn) ) {
			fn = fn.apply(this, _.slice(arguments, 1));
		}
		if ( name ) this.middleware[name] = fn;
		this.emit('use', name || 'anonymous');
	}
	return this;
};

// Assign `setting` to `value`, or return `setting`'s value
Application.prototype.set = function ( setting, value ) {
	if ( arguments.length === 1 ) {
		if ( _.has(this.settings, setting) ) {
			return this.settings[setting];
		}
		if ( this.parent ) {
			return this.parent.set(setting);
		}
	} else {
		return this.settings[setting] = value;
	}
};

// gets `setting`
Application.prototype.get = function ( setting ) {
	return this.settings[setting];
};

// Enable `setting`
Application.prototype.enable = function ( setting ) {
	this.settings[setting] = true;
};

// Disable `setting`
Application.prototype.disable = function ( setting ) {
	this.settings[setting] = false;
};

// Check if `setting` is enabled
Application.prototype.enabled = function ( setting ) {
	return !!this.settings[setting];
};

// Check if `setting` is disabled
Application.prototype.disabled = function ( setting ) {
	return !this.settings[setting];
};

// defines `setting`, similar to `Application#set`
Application.prototype.define = function ( setting, value ) {
	_.set(this.settings, setting, arguments.length == 1 ? 1 : value);
};

// checks if `setting` exists
Application.prototype.defined = function ( setting ) {
	return _.has(this.settings, setting);
};

// useful if you want to track mounted namespace's (e.g. debugging, etc)
Application.prototype.toString = function ( bare ) {
	var path = this.appName;
	if ( this.parent ) path += this.parent.toString(true);
	if ( !bare ) path = '[application ' + path + ']';
	return path;
};