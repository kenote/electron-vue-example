#!/bin/bash

start(){
  target=$(cat setting.json | jq -r '.windows.target')
  rsync -av ./ ${target} --exclude-from="./exclude.local.list" --delete
  echo
}

start