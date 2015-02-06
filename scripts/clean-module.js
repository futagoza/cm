require("./globals");

if ( argc === 0 ) {
  abort("You must specify a project to clean");
}

task(function(project, path){

  each([

      '.npmignore',
      'LICENSE',
      'package.json',
      'README.md'

  ], function ( filename ) {
    rm(join(path, filename));
  });

});
