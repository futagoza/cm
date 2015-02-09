require("./globals");

if ( argc === 0 ) {
  abort("You must specify a project to publish");
}

task(function(project, path){
  exec(
    'npm publish', { cwd: path },
    function ( error, stdout, stderr ) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if ( error !== null ) {
        console.log('exec error: ' + error);
      }
    }
  );
});
