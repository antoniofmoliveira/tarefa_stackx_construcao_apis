#!/bin/bash
# chamada de api que exclui um contato de forma segura.
. ./.env
curl -X DELETE http:/localhost:1234/contatos/7 -H "Authorization: Bearer $ACCESS_TOKEN"
