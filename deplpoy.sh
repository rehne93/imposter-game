#!/bin/bash

npm run build-prod
rm -rf docs/
mkdir docs/
cp -R ./dist/imposter/browser/* docs/
