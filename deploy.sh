#!/usr/bin/env bash
# Builds the site for GitHub Pages (served under /acme-advocate/) and publishes dist/ to the gh-pages branch.
# GitHub Pages has no SPA fallback, so 404.html is a copy of the app: /acme-advocate/<name> links still load.
set -euo pipefail
cd "$(dirname "$0")"
BASE_PATH=/acme-advocate/ pnpm build
cp dist/index.html dist/404.html
touch dist/.nojekyll
cd dist
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(git -C .. rev-parse --short HEAD)"
git push -q -f "$(git -C .. remote get-url origin)" gh-pages
rm -rf .git
