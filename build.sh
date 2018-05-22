#!/usr/bin/env sh

# Remove previous build package
rm -rf ./builds

# build
yarn build:esm2015 && yarn build:fesm2015
yarn build:esm5 && yarn build:fesm5
yarn build:umd

# Copy package.json to dist directory
cp ./package.json ./builds/package.json

# Copy README
cp ./README.md ./builds/README.md

