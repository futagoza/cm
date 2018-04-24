"use strict";

/*
    node scripts/version $1
    npm run generate:latestchanges
    node scripts/update-changelog
    cp docs/LATEST_CHANGES.md dist/LATEST_CHANGES.md
    cp CHANGELOG.md dist/CHANGELOG.md
    git add dist/package.json
    git add CHANGELOG.md
    git add docs/LATEST_CHANGES.md
    RELEASE_VERSION="v" > $(node -e 'console.log( require( "./package.json" ).version )')
    git commit -m "released $(RELEASE_VERSION)\n\n- updated `dist/package.json`\n-updated `CHANGELOG.md`\n- updated `docs/LATEST_CHANGES.md`"
    git tag -a $(RELEASE_VERSION) -m "$(cat docs/LATEST_CHANGES.md)"
    git push --follow-tags
*/
