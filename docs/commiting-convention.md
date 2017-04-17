# about

I prefered not to use [changelogs](https://en.wikipedia.org/wiki/Changelog), as they require a constant maintainence. Recently it seems that the best way to keep track of changes to my work (npm modules or various other projects) is via commit messages, so using `conventional-changelog` and `git tag`ging I can automatically generate the buggers, and they actually provide a cleaner overview then Github commit pages.

# rules

If the project does'nt include a changelog then there are no rules, but if one is used, then:

* commits must have a summary, with a discriptive tag in the beginning. The most comman tags are:
    * `Fix` - for a bug fix
    * `Update` - for a backwards-compatible enhancement or change
    * `New` - implemented a new feature
    * `Breaking` - for a backwards-incompatible enhancement or feature
    * `Docs` - changes to documentation, README's or source file comments
    * `Build` - changes to build process (scripts, tasks, configs, etc)
    * `Upgrade` - for a backwards-compatible upgarde or for dependency upgrades
    * `Refactor` - for source file refactoring or directory and file restructuring
    * `Chore` - for benchmarks and source tests (api, behavior or unit)
    * `Release` - for version incrementing, publishing and updating changelogs
* for commits tagged with `Docs` or `Release` it is encourged to use ` [ci skip]` at the end of the summary
* for commits tagged with `Fix`, use `(fixes #1234)` (or `(refs #1234)` for partial fixes) at the end of the summary
* Before publishing, you must use `conventional-changelog` to update `CHANGELOG.md`
* unless its to fix a style, spelling or grammar issue, `CHANGELOG.md` cannot be modified by hand (per say ;P)

# examples

a commit message
```
Tag: Short description (fixes #1234)

Longer description here if necessary
```

summary examples
```
Build: Update Travis to only test Node 0.10 (refs #734)
Fix: Semi rule incorrectly flagging extra semicolon (fixes #840)
Upgrade: Esprima to 1.2, switch to using Esprima comment attachment (fixes #730)
```

# links

* [https://github.com/eslint/eslint/blob/master/docs/developer-guide/contributing/pull-requests.md#step-2-make-your-changes](https://github.com/eslint/eslint/blob/master/docs/developer-guide/contributing/pull-requests.md#step-2-make-your-changes)
* [https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)
