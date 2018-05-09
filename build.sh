#!/usr/bin/env sh

# Remove previous build package
rm -rf ./dist

# build
npm run build

# Copy package.json to dist directory
cp ./package.json ./dist/package.json

# Copy README
cp ./README.md ./dist/README.md
