require("./globals");

if ( argc === 0 ) {
  abort("You must specify a project to prepare");
}

task(function(project, path){

  var package = require(join(path, "cm-project.json"));
  var base = require(join(SRC_DIR, "base-package.json"));

  each(base, function(value, property){
    if ( !package.hasOwnProperty(property) ) {
      package[property] = value;
    } else {
      if ( property === 'keywords' ) {
        var target = package[property];
        each(value, function(item){
          if ( target.indexOf(item) === -1 ) {
            target[target.length] = item;
          }
        });
      }
    }
  });

  writeFile(join(path, '.npmignore'), readFile(join(SRC_DIR, ".npmignore")));
  writeFile(join(path, 'LICENSE'), readFile(join(ROOT_DIR, "LICENSE")));
  writeFile(join(path, 'package.json'), JSON.stringify(package, null, '  '));
  writeFile(join(path, 'README.md'), str_replace(readFile(join(SRC_DIR, "readme-template.md")), {
    '#{id}': project, '#{name}': package.name, '#{description}': package.description
  }));

});
