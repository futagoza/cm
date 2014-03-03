// required modules
var FS = require('fs'),
    PATH = require('path'),
    mkdirp = require('mkdirp'),
    _ = require('./utils');

// export to the world
var fs = exports = module.exports = {};
_.each(FS, function(property, name){
	fs[name] = property;
});
fs.FS = FS;
fs.PATH = PATH;

// patch's
if ( !fs.exists ) {
	fs.exists = PATH.exists;
	fs.existsSync = PATH.existsSync;
}
fs.mkdir = mkdirp;
fs.mkdirSync = mkdirp.sync;
fs.resolve = PATH.resolve;
fs.basename = PATH.basename;
fs.dirname = PATH.dirname;
fs.extname = PATH.extname;
fs.relative = PATH.relative;
fs.join = PATH.join;

// default callback for async functions
function cb ( err ) { if ( err ) throw err; }

// essential util to fix paths for windows
var isWindows = process.platform === 'win32';
function fixPath ( path ) {
	return isWindows? path.replace(/\//g, '\\') : path;
}
fs.path = fixPath;

// upgrade `writeFile` and `writeFileSync` to use `mkdirp`
fs.writeFile = function ( file ) {
	var args = arguments;
	fs.mkdir(fs.dirname(file), function(){
		FS.writeFile.apply(FS, args);
	});
};
fs.writeFileSync = function ( file ) {
	fs.mkdirSync(fs.dirname(file));
	FS.writeFileSync.apply(FS, arguments);
};

// directory walker
fs.walk = function ( dir, fn, lastly ) {
	if ( !fn ) fn = cb;
	if ( !lastly ) lastly = cb;
	FS.readdir(dir, function(err, items){
		if ( err ) return fn(err);
		var length = items.length, i = 0;
		if ( length === 0 ) return lastly();
		function readitem ( item ) {
			var path = fixPath(dir + '/' + item);
			FS.stat(path, function(err, stats){
				var isLast = length === ++i;
				if ( err ) return fn(err);
				fn(null, path, item, stats, isLast);
				if ( isLast ) lastly();
			});
		}
		while ( items.length !== 0 ) {
			readitem(items.shift());
		}
	});
};
fs.walkSync = function ( dir, fn ) {
	if ( !fn ) var items = [];
	FS.readdirSync(dir).forEach(function(item){
		var path = fixPath(dir + '/' + item);
		if ( fn ) {
			fn(path, item, FS.statSync(path));
		} else {
			var stats = FS.statSync(path);
			stats.name = item;
			stats.path = path;
			items.push(stats);
		}
	});
	if ( !fn ) return items;
};

// copy file to target
fs.copyFile = function ( file, target, fn ) {
	if ( !fn ) fn = cb;
	FS.readFile(file, function(err, data){
		if ( err ) return fn(err);
		var dir = PATH.dirname(target);
		FS.exists(dir, function(exists){
			if ( exists ) {
				FS.writeFile(target, data, fn);
			} else {
				fs.mkdir(dir, function(err){
					if ( err ) return fn(err);
					FS.writeFile(target, data, fn);
				});
			}
		});
	});
};
fs.copyFileSync = function ( file, target ) {
	var dir = PATH.dirname(target);
	if ( !FS.existsSync(dir) ) {
		if ( !fs.mkdirSync(dir) ) {
			throw "could not create path for '" + target + "'";
		}
	}
	FS.writeFileSync(target, FS.readFileSync(file));
	return FS.existsSync(target);
};

// copy dir to target
fs.copydir = function ( source, target, fn ) {
	if ( !fn ) fn = cb;
	function copydir ( err ) {
		if ( err ) return fn(err);
		FS.readdir(source, function(err, items){
			if ( err ) return fn(err);
			var length = items.length, i = 0;
			function lastly ( ) {
				if ( length !== ++i ) return;
				FS.exists(target, function(exists){ fn(!exists); });
			}
			if ( length === 0 ) return lastly(length = 1);
			while ( items.length !== 0 ) {
				(function(item){
					var path = fixPath(source + '/' + item);
					FS.stat(path, function(err, stats){
						if ( err ) return fn(err);
						var targetpath = fixPath(target + '/' + item);
						if ( stats.isDirectory() ) {
							fs.copydir(path, targetpath, function(err){
								if ( err ) fn(err);
								lastly();
							});
						} else {
							fs.copyFile(path, targetpath, function(err){
								if ( err ) fn(err);
								lastly();
							});
						}
					});
				})(items.shift());
			}
		});
	}
	FS.exists(target, function(exists){
		exists? copydir() : fs.mkdir(target, copydir);
	});
};
fs.copydirSync = function ( source, target ) {
	if ( !FS.existsSync(target) ) {
		if ( !fs.mkdirSync(target) ) {
			throw "could not create target path '" + target + "'";
		}
	}
	var items = fs.walkSync(source), i = 0;
	items.forEach(function(item){
		var targetpath = fixPath(target + '/' + item.name);
		if ( item.isDirectory() ) {
			if ( fs.copydirSync(item.path, targetpath) ) i++;
		} else {
			if ( fs.copyFileSync(item.path, targetpath) ) i++;
		}
	});
	return FS.existsSync(target) && i === items.length;
};

// copy source to target
fs.copy = function ( source, target, fn ) {
	if ( !fn ) fn = cb;
	FS.stat(source, function(err, stats){
		if ( err ) return fn(err);
		if ( stats.isDirectory() ) {
			fs.copydir(source, target, fn);
		} else {
			fs.copyFile(source, target, fn);
		}
	});
};
fs.copySync = function ( source, target ) {
	var stats = FS.statSync(source);
	if ( stats ) {
		if ( stats.isDirectory() ) {
			return fs.copydirSync(source, target);
		} else {
			return fs.copyFileSync(source, target);
		}
	}
};

// remove all content then the directory
fs.rmdir = function ( dir, fn ) {
	if ( !fn ) fn = cb;
	FS.exists(dir, function(exists){
		if ( !exists ) return fn();
		FS.readdir(dir, function(err, items){
			if ( err ) return fn(err);
			var length = items.length, i = 0;
			function lastly ( ) {
				if ( length !== ++i ) return;
				FS.rmdir(dir, function(err){
					if ( err ) return fn(err);
					FS.exists(dir, function(exists){ fn(exists); });
				});
			}
			if ( length === 0 ) return lastly(length = 1);
			while ( items.length !== 0 ) {
				(function(item){
					var path = fixPath(dir + '/' + item);
					FS.stat(path, function(err, stats){
						if ( err ) return fn(err);
						if ( stats.isDirectory() ) {
							fs.rmdir(path, function(err){
								if ( err ) fn(err);
								lastly();
							});
						} else {
							FS.unlink(path, function(err){
								if ( err ) fn(err);
								lastly();
							});
						}
					});
				})(items.shift());
			}
		});
	});
};
fs.rmdirSync = function ( dir ) {
	if ( !FS.existsSync(dir) ) return true;
	fs.walkSync(dir).forEach(function(item){
		if ( item.isDirectory() ) {
			fs.rmdirSync(item.path);
		} else {
			FS.unlinkSync(item.path);
		}
	});
	FS.rmdirSync(dir)
	return FS.existsSync(dir);
};

// delete file or directory
fs.remove = function ( path, fn ) {
	if ( !fn ) fn = cb;
	FS.stat(path, function(err, stats){
		if ( err ) return fn(err);
		if ( stats.isDirectory() ) {
			fs.rmdir(path, fn);
		} else {
			FS.unlink(path, fn);
		}
	});
};
fs['delete'] = fs.remove;

// delete file or directory
fs.removeSync = function ( path ) {
	var stats = FS.statSync(path);
	if ( stats ) {
		if ( stats.isDirectory() ) {
			return fs.rmdirSync(path);
		} else {
			return FS.unlinkSync(path);
		}
	}
};
fs.deleteSync = fs.removeSync;

// move file or directory
fs.move = function ( from, to, fn ) {
	if ( !fn ) fn = cb;
	fs.copy(from, to, function(err){
		if ( err ) return fn(err);
		fs.remove(from,  fn);
	});
};
fs.moveSync = function ( from, to ) {
	if ( fs.copySync(from, to) ) {
		return fs.removeSync(from);
	}
};

// isDirectory or isFile
fs.isDirectory = function ( path, fn ) {
	if ( arguments.length === 1 ) {
		return FS.statSync(path).isDirectory();
	} else {
		FS.stat(path, function(err, stats){
			if ( err ) return fn(err);
			fn(null, stats.isDirectory());
		});
	}
};
fs.isFile = function ( path, fn ) {
	if ( arguments.length === 1 ) {
		return FS.statSync(path).isFile();
	} else {
		FS.stat(path, function(err, stats){
			if ( err ) return fn(err);
			fn(null, stats.isFile());
		});
	}
};

fs.Error = function ( path, message ) {
	var args;

	if ( arguments.length > 2 ) {
		args = [].slice.call(arguments, 1);
		message = util.format.apply(fs, args);
	} else {
		message = message || 'FS Error';
	}
	
	Error.call(message);
	this.name = "FS Error";
	this.path = path;
	this.dirname = fs.dirname(path);
	this.basename = fs.basename(path);
};
_.inherits(fs.Error, Error);