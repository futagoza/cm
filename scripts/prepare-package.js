require("./globals");

if ( argc === 0 ) {
  abort("You must specify a project to prepare");
}

task(function(project, path){

  var package = merge(
    require(join(path, "cm-project.json")),
    require(join(SRC_DIR, "base-package.json"))
  );

  writeFile(join(path, '.npmignore'), readFile(join(SRC_DIR, ".npmignore")));
  writeFile(join(path, 'LICENSE'), readFile(join(ROOT_DIR, "LICENSE")));
  writeFile(join(path, 'package.json'), JSON.stringify(package, null, '  '));
  writeFile(join(path, 'README.md'), str_replace(readFile(join(SRC_DIR, "readme-template.md")), {
    '$(id)': project, '$(name)': package.name, '$(discription)': package.discription
  }));

});
