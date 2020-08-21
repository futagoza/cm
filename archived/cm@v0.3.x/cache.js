/*!
 * based on Connect - Cache (Copyright(c) 2011 Sencha Inc, MIT Licensed)
 */

// required modules
var _ = require("./utils"), EventEmitter = require('./events').EventEmitter;

// creates a new cache store
function Cache ( limit ) {
	if ( !(this instanceof Cache) ) {
		return new Cache(limit);
	}
	EventEmitter.call(this);
	this.store = {};
	this.size = 0;
	this.limit = limit || -1;
}
_.inherits(Cache, EventEmitter);

// checks if the cache has the given `key`
Cache.prototype.has = function ( key ) {
	return hasOwn.call(this.store, key) && this.store[key] !== null;
};

// Add a cache `key`
Cache.prototype.add = function ( key ) {
	if ( this.size === this.limit ) {
		this.emit("limit", key, this);
		return this.get(key);
	}
	var arr = this.store[key] = [];
	++this.size;
	this.emit("add", key, arr, this);
	return arr;
};

// Get the object stored for `key`
Cache.prototype.get = function (key ) {
	return this.store[key];
};

// Remove `key`
Cache.prototype.remove = function ( key ) {
	if ( this.has(key) ) {
		var arr = this.get(key).slice(0);
		delete this.store[key];
		if ( this.has(key) ) {
			this.store[key] = null;
		}
		--this.size;
		this.emit("remove", key, arr, this);
		return arr;
	}
};

// Expose `Cache`
Cache.Cache = Cache;
module.exports = Cache;