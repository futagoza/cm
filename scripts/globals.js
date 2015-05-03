var fs = require('efe');
var UglifyJS = require('uglify-js');

global.rm = fs.removeSync;
global.mkdir = fs.mkdirsSync;
global.exec = require('child_process').exec;

global.exists = fs.existsSync;
global.basename = fs.basename;
global.dirname = fs.dirname;
global.extname = fs.extname;
global.join = fs.join;
global.resolve = fs.resolve;
global.lstat = fs.lstatSync;
global.walk = fs.walkSync;

global.ROOT_DIR = join(__dirname, '..');
global.PACKAGES_DIR = join(ROOT_DIR, 'packages');
global.SRC_DIR = join(ROOT_DIR, 'src');

global.argv = process.argv.slice(2);
global.argc = argv.length;

global.readFile = function ( filename ) {
  return fs.readFileSync(filename).toString();
};

global.writeFile = function ( filename, data ) {
  mkdir(dirname(filename));
  return fs.writeFileSync(filename, data);
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

global.each = function ( object, iterator, context ) {
  if ( Array.isArray(object) ) {
    object.forEach(iterator, context);
  } else {
    for ( var key in object ) {
      if ( object.hasOwnProperty(key) ) {
        iterator.call(context, object[key], key, object);
      }
    }
  }
};

global.task = function ( action ) {
  var project = argv[0], path;
  if ( project === "*" || project === "all" ) {
    fs.readdirSync(PACKAGES_DIR).forEach(function(item){
      action(item, join(PACKAGES_DIR, item));
    });
  } else {
    path = join(PACKAGES_DIR, project);
    if ( !exists(path) ) {
      abort("The project '" + project + "' is not a known cm project.");
    }
    action(project, path);
  }
};

global.str_replace = function ( string, dictionary ) {
  each(dictionary, function(value, key){
    if ( value === null || value === void 0 ) value = "";
      if ( typeof key === 'string' ) {
        key = new RegExp(key, 'g');
      }
      string = string.replace(key, value);
  });
  return string;
};
