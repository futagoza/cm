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

changelog:
	./node_modules/.bin/conventional-changelog -p eslint -i CHANGELOG.md -s
	cp CHANGELOG.md dist/CHANGELOG.md

readme:
	./node_modules/.bin/markdown-toc -i README.md
	cp README.md dist/README.md

clean:
	node scripts/clean-module.js $(PACKAGE)

.PHONY:  all compile build prepare publish docs changelog readme clean
.SILENT: all compile build prepare publish docs changelog readme clean
