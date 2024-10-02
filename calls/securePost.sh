#!/bin/bash
# chamada de api que adiciona um item de forma segura.
. ./.env
curl -X POST -H "Content-Type: application/json" -d @post3.json http://localhost:1234/items -H "Authorization: Bearer $ACCESS_TOKEN"
