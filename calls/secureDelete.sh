#!/bin/bash
# chamada de api que exclui um item de forma segura.
. ./.env
curl -X DELETE http:/localhost:1234/items/7 -H "Authorization: Bearer $ACCESS_TOKEN"
