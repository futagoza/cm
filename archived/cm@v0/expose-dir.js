var fs = require('fs'), path = require('path');

function expose ( dir, exports ) {
	return setGetters(exports || (module.parent ? module.parent.exports : {}), dir, ignoreIndex);
}
module.exports = exports = expose;
exports.expose = expose;

function dummyFilterer ( ) { return true; }
exports.dummyFilterer = dummyFilterer;

function getDirContent ( dir, test ) {
	if ( !test ) test = dummyFilterer;
	return fs.readdirSync(dir).filter(test);
}
exports.getDirContent = getDirContent;

function setGetters ( exports, dir, test ) {
	getDirContent(dir, test).forEach(function(name){
		var item = path.join(dir, name), isDirectory = fs.statSync(item).isDirectory();
		if ( isDirectory || path.extname(name) == '.js' ) {
			exports.__defineGetter__(name, function(){
				return isDirectory ? setGetters({}, item, test) : require(item);
			});
		}
	});
	return exports;
}
exports.setGetters = setGetters;

function ignoreIndex ( name ) {
	return name !== "index.js";
}
exports.ignoreIndex = ignoreIndex;