#!/bin/bash
. ./.env
curl -X PUT -H "Content-Type: application/json" -d @put.json http:/localhost:1234/items/1  -H "Authorization: Bearer $ACCESS_TOKEN"
