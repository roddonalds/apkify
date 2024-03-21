#!/bin/bash

echo
echo 'Tagging current app version'
echo $(jq '.version' /root/app/package.json)