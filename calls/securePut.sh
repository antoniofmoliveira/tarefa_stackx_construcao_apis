#!/bin/bash
# chamada de api que altera um contato de forma segura.
. ./.env
curl -X PUT -H "Content-Type: application/json" -d @put.json http:/localhost:1234/contatos/1010928583032111105  -H "Authorization: Bearer $ACCESS_TOKEN"
