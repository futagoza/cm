PACKAGE = "*"

all: clean compile build prepare publish
	node scripts/clean-module.js $(PACKAGE)

compile:
	node scripts/compile-module.js $(PACKAGE)

build:
	node scripts/build-dist.js $(PACKAGE)

prepare:
	node scripts/prepare-package.js $(PACKAGE)

publish:
	node scripts/npm-publish.js $(PACKAGE)

docs:
	./node_modules/.bin/jsdoc -c .jsdoc.json --verbose

clean:
	node scripts/clean-module.js $(PACKAGE)

.PHONY:  all compile build prepare publish docs clean
.SILENT: all compile build prepare publish docs clean
