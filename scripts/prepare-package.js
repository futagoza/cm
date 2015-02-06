require("./globals");

if ( argc === 0 ) {
  abort("You must specify a project to prepare");
}

task(function(project, path){

  var package = merge(
    require(join(path, "cm-project.json")),
    require(join(SRC_DIR, "base-package.json"))
  );

  writeFile(join(path, 'package.json'), JSON.stringify(package, null, '  '));
  writeFile(join(path, '.npmignore'), readFile(join(SRC_DIR, ".npmignore")));
});
