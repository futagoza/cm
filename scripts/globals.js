var fs = require('fs-extra');
var path = require('path');
var UglifyJS = require('uglifyjs');

global.mkdir = require('mkdirp').sync;
global.exec = require('child_process').exec;

global.exists = fs.existsSync;
global.basename = path.basename;
global.dirname = path.dirname;
global.extname = path.extname;
global.join = path.join;
global.resolve = path.resolve;

global.ROOT_DIR = join(__dirname, '..');
global.PACKAGES_DIR = join(ROOT_DIR, 'packages');
global.SRC_DIR = join(ROOT_DIR, 'src');

global.readFile = function ( filename ) {
  return fs.readFileSync(filename).toString();
};

global.writeFile = function ( filename, data ) {
  mkdir(dirname(filename));
  return fs.writeFileSync(filename, data);
};

global.lstat = function ( path ) {
  var stat = fs.lstatSync(path);
  stat.path = path;
  stat.basename = basename(path);
  stat.dirname = dirname(path);
  stat.extname = extname(path);
  return stat;
};

global.walk = function ( path, callback ) {
  var stat = lstat(path);
  if ( stat.isDirectory() )
    fs.readdirSync(path).forEach(function(item){
      walk(join(path, item), callback);
    });
  else
    callback(path, stat);
};

global.readdir = function ( path ) {
  var files = {};
  walk(path, function(filename, stat){
    files[filename] = stat;
  });
  return files;
};

global.minify = function ( data ) {
  return UglifyJS.minify(data, { fromString: true }).code;
};

var newLineChars = /(\n|\r\n|\r|\u2028|\u2029)/g;
global.indent = function ( data, tabs ) {
  return (tabs || "  ") + data.replace(newLineChars, function(m, nl){ return nl + (tabs || "  "); });
};
