require("./globals");

if ( argc === 0 ) {
  abort("You must specify a project to clean");
}

task(function(project, path){

  rm(join(path, 'package.json'));
  rm(join(path, '.npmignore'));

});
