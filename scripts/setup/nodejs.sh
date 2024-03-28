#!/bin/bash

echo 'setup-nodejs'
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source /root/.bashrc
nvm install 20 && nvm use 20;

sleep 1;

echo 'Setup-nodejs-packages'
npm install -g shelljs@0.8.5
npm install -g cordova@12.0.0
npm install -g cordova-icon@1.0.0
npm install -g json-beautify@1.1.1
npm install -g xml2js@0.6.2