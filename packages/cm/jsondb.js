// required modules
var _ = require('./utils'), fs = require('./fs'), resolve = fs.join;

// private utils
	function tablepath ( database, table ) {
		return resolve(database.name, '/' + table + '/');
	}
	function rowpath ( table, row ) {
		return resolve(table.database.name, '/' + table.name + '/' + row);
	}
	function dbCallback ( callback, db ) {
		return function ( err ) {
			if ( callback ) callback.call(db, err, db);
		};
	}
	function tableCallback ( callback, table ) {
		return function ( err ) {
			if ( callback ) callback.call(table, err, table, table.db);
		};
	}
	function rowCallback ( callback, row ) {
		return function ( err ) {
			if ( callback ) callback.call(row, err, row, row.table, row.db);
		};
	}

// public utils
	exports.create = function ( database, callback ) {
		fs.mkdir(database + '/', callback || function ( ) { });
	};
	exports.createSync = function ( database ) {
		return fs.mkdirSync(database + '/');
	};
	exports.isDatabase = function ( object ) {
		return object instanceof exports.Database;
	};
	exports.isTable = function ( object ) {
		return object instanceof exports.Table;
	};
	exports.isRow = function ( object ) {
		return object instanceof exports.Row;
	};

// jsondb database class
	exports.with = function ( database ) {
		return new exports.Database(database);
	};
	exports.Database = function ( name ) {
		if ( !exports.isDatabase(this) ) {
			return new exports.Database(name);
		}
		this.name = name;
	};
	exports.Database.prototype.create = function ( table, callback ) {
		fs.mkdir(tablepath(this, table), dbCallback(callback, this)); return this;
	};
	exports.Database.prototype.createSync = function ( table ) {
		fs.mkdirSync(tablepath(this, table)); return this;
	};
	exports.Database.prototype.has = function ( table, callback ) {
		var path = tablepath(this, table);
		if ( callback ) {
			fs.exists(path, dbCallback(callback, this));
			return this;
		} else {
			return fs.existsSync(path);
		}
	};
	exports.Database.prototype.from = function ( table, callback ) {
		var db = this;
		if ( callback ) {
			this.has(table, function(exists){
				if ( !exists ) {
					callback(new Error("'" + table + "' doesn't exist!"));
				} else {
					var tbl = new exports.Table(table, db);
					callback.call(tbl, null, tbl, db);
				}
			});
			return this;
		} else {
			if ( !this.hasSync(table) ) {
				throw new Error("'" + table + "' doesn't exist!");
			} else {
				return new exports.Table(table, this);
			}
		}
	};
	exports.Database.prototype.remove = function ( table, callback ) {
		fs.rmdir(tablepath(this, table), dbCallback(callback, this));
	};
	exports.Database.prototype.removeSync = function ( table ) {
		return fs.rmdirSync(tablepath(this, table));
	};
	exports.Database.prototype.delete = function ( callback ) {
		fs.rmdir(this.name + '/', dbCallback(callback, this));
	};
	exports.Database.prototype.deleteSync = function ( ) {
		return fs.rmdirSync(this.name + '/');
	};

// jsondb table class
	exports.Table = function ( name, database ) {
		if ( !exports.isTable(this) ) {
			return new exports.Table(name, database);
		}
		this.name = name;
		this.database = database;
	};
	exports.Table.prototype.get = function ( row, callback ) {
		var table = this, path = rowpath(this, row);
		if ( callback ) {
			fs.readFile(path, function(err, data){
				callback(err, err ? null : new exports.Row(row, JSON.parse(data.toString()), table), table, table.database);
			});
			return this;
		} else {
			return new exports.Row(row, JSON.parse(fs.readFileSync(path).toString()), this);
		}
	};
	exports.Table.prototype.insert = function ( row, data, callback ) {
		fs.writeFile(rowpath(this, row), JSON.stringify(data), { flag: 'wx' }, tableCallback(callback, this));
		return this;
	};
	exports.Table.prototype.insertSync = function ( row, data ) {
		return fs.writeFileSync(rowpath(this, row), JSON.stringify(data), { flag: 'wx' });
	};
	exports.Table.prototype.has = function ( row, callback ) {
		var path = rowpath(this, row);
		if ( callback ) {
			fs.exists(path, tableCallback(callback, this));
			return this;
		} else {
			return fs.existsSync(path);
		}
	};
	exports.Table.prototype.update = function ( row, data, callback ) {
		var path = rowpath(this, row), table = this;
		fs.exists(path, function(exists){
			if ( exists ) {
				fs.writeFile(path, JSON.stringify(data), tableCallback(callback, table));
			} else {
				callback(new fs.Error(path, "doesn't exists!"));
			}
		});
		return this;
	};
	exports.Table.prototype.updateSync = function ( row, data ) {
		var path = rowpath(this, row);
		if ( fs.existsSync(path) ) {
			fs.writeFileSync(path, JSON.stringify(data));
			return this;
		} else {
			throw new fs.Error(path, "doesn't exists!");
		}
	};
	exports.Table.prototype.where = function ( condition, max, callback ) {
		var table = this, results = [];
		if ( _.isFunction(max) ) {
			callback = max; max = arguments[2] || null;
		}
		if ( callback ) {
			fs.readdir(rowpath(this, ''), function(err, rows){
				if ( err ) {
					callback(err, []);
				} else {
					_.check(rows, function(name, i, next, end){
						table.get(rowpath(table, name), function(err, row){
							if ( err ) {
								callback(err); end();
							} else {
								if ( condition(row, row.data) ) results.push(row);
								if ( _.isNumber(max) ) {
									if ( ++i == max ) { callback(null, results); end(); }
								}
								if ( i == rows.length ) callback(null, results);
							}
						});
					});
				}
			});
			return this;
		} else {
			_.check(fs.readdirSync(rowpath(this, '')), function(name, i, next, end){
				var row = table.get(rowpath(table, name));
				if ( condition(row, row.data) ) results.push(row);
				if ( _.isNumber(max) ) {
					if ( ++i == max ) { end(); }
				}
			});
			return results;
		}
	};
	exports.Table.prototype.find = function ( condition, callback ) {
		return this.where(condition, 1, callback);
	};
	exports.Table.prototype.count = function ( callback ) {
		if ( callback ) {
			var rowsLength = 0;
			fs.walk(rowpath(this, ''), function(err, path, item, stat, isLast){
				if ( err ) return callback(err);
				if ( stat.isFile() ) ++rowsLength;
				if ( isLast ) callback(null, rowsLength);
			});
		} else {
			return fs.walkSync(rowpath(this, '')).filter(function(stats){ return stats.isFile(); }).length;
		}
	};
	exports.Table.prototype.remove = function ( row, callback ) {
		fs.unlink(rowpath(this, row), tableCallback(callback, this));
		return this;
	};
	exports.Table.prototype.removeSync = function ( row ) {
		return fs.unlinkSync(rowpath(this, row));
	};
	exports.Table.prototype.delete = function ( callback ) {
		this.database.remove(this.name, tableCallback(callback, this));
		return this;
	};
	exports.Table.prototype.deleteSync = function ( ) {
		return this.database.removeSync(this.name);
	};

// jsondb row class
	exports.Row = function ( name, data, table ) {
		this.name = name;
		this.data = data;
		this.table = table;
		this.database = table.database;
	};.
	exports.Row.prototype.has = function ( key ) {
		return _.has(this.data, key);
	};
	exports.Row.prototype.get = function ( key ) {
		if ( !this.has(key) ) {
			throw new Error("'" + key + "' doesn't exists in '" + this.name + "'")
		}
		return this.data[key];
	};
	exports.Row.prototype.insert = function ( key, value ) {
		if ( this.has(key) ) {
			throw new Error("'" + key + "' already exists in '" + this.name + "'")
		}
		this.data[key] = value;
		return this;
	};
	exports.Row.prototype.update = function ( key, value ) {
		if ( !this.has(key) ) {
			throw new Error("'" + key + "' doesn't exists in '" + this.name + "'")
		}
		this.data[key] = value;
		return this;
	};
	exports.Row.prototype.where = function ( condition, max ) {
		var row = this, results = {}, i = 0;
		_.check(this.data, function(value, key, next, end){
			if ( condition.call(row, value, key, row) ) {
				results[key] = value;
				if ( _.isNumber(max) ) {
					if ( ++i == max ) end();
				}
			}
		});
		return results;
	};
	exports.Row.prototype.find = function ( condition ) {
		return this.where(condition, 1);
	};
	exports.Row.prototype.count = function ( condition ) {
		return Object.keys(condition ? this.where(condition) : this.data).length;
	};
	exports.Row.prototype.remove = function ( key ) {
		if ( this.has(key) ) {
			delete this.data[key];
		}
		return this;
	};
	exports.Row.prototype.save = function ( callback ) {
		this.table.update(this.name, this.data, rowCallback(callback, this));
		return this;
	};
	exports.Row.prototype.saveSync = function ( ) {
		this.table.updateSync(this.name, this.data);
		return this;
	};
	exports.Row.prototype.delete = function ( callback ) {
		this.table.remove(this.name, rowCallback(callback, this));
		return this;
	};
	exports.Row.prototype.deleteSync = function ( ) {
		this.table.removeSync(this.name);
		return this;
	};