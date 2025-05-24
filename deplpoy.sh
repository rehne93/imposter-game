#!/bin/bash

ng build --configuration=production --base-href="https://rehne93.github.io/imposter-game/" --deploy-url="https://rehne93.github.io/imposter-game/"
rm -rf docs/
mkdir docs/
cp -R ./dist/imposter/browser/* docs/
