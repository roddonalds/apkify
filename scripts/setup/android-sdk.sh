#!/bin/bash

echo 'Setup-android-sdk'
sdkmanager "build-tools;19.1.0"
sdkmanager "build-tools;29.0.3" 
sdkmanager "platforms;android-29"
yes | sdkmanager --list
yes | sdkmanager --licenses