# rules

I currently use a mixture of [coding conventions](https://en.wikipedia.org/wiki/Coding_conventions) in my projects.

* distribution related files must reside in `"dist"`
* documentation can reside in `"dist/docs"`, `"docs"`, alongside source, or a mixture of these
* javascript files that help `npm scripts` must reside in `"scripts"`
* source code must reside in `"src"` for most projects, but `"Source"` is used for projects with mutiple source types
* javascript source files must be in `ES2017+`, unless `optimization` or `compatibility` are factored in
* javascript files used for `npm scripts` or bin files must be in `ES5` or `ES2015`, based on current `Node.js LTS`
* documentation in source code is completely _optional_, but prefered
* if tests are created, using `Travis` is required, but `AppVeyor` (while prefered) is _optional_
* usage of `npm run` with javascript files is encouraged over a `Makefile`
* all dependencies must reside in `"package.json"`, but only production related dependencies reside in `"dist/package.json"`
* javascript files must pass eslint tests, no matter what the file is used for

# contributing

If you decide to contribute, before sending a PR, please ensure that the JavaScript is valid. You can do this by running `npm run lint` to use the local copy of eslint, or if you have eslint installed globally, run `eslint --cache bin scripts src`, but using the local copy is prefered.

# links

* [https://travis-ci.org/](https://travis-ci.org/)
* [https://www.appveyor.com/](https://www.appveyor.com/)
* [https://docs.npmjs.com/cli/run-script](https://docs.npmjs.com/cli/run-script)
* [http://eslint.org/docs/user-guide/configuring](http://eslint.org/docs/user-guide/configuring)
* [http://eslint.org/docs/developer-guide/shareable-configs](http://eslint.org/docs/developer-guide/shareable-configs)
* [https://github.com/futagoza/eslint-config-futagozaryuu](https://github.com/futagoza/eslint-config-futagozaryuu)
