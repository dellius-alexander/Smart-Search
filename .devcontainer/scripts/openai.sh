#!/usr/bin/env bash


curl https://api.openai.com/v1/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '\{ "model":"text-davinci-003","prompt":"how to fix cordova error 'Current working directory is not a Cordova-based project'?","temperature":0.7,"max_tokens":256,"top_p": 1,"frequency_penalty": 0,"presence_penalty": 0 }' > response.json
