#!/bin/bash

echo
echo 'Tagging current app version'

sleep 1

cd /root/app
git tag $(jq '.version' ./package.json)


echo
echo 'Syncronizing repository'

sleep 1

cd /root/app
git add .
git commit -m $(jq '.version' /root/app/package.json)
git push origin master --tags

echo
echo "New tag $(jq '.version' /root/app/package.json) syncronized succesfully"