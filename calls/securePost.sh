#!/bin/bash
# chamada de api que adiciona um contato de forma segura.
. ./.env
# curl -X POST -H "Content-Type: application/json" -d @post3.json http://localhost:1234/contatos -H "Authorization: Bearer $ACCESS_TOKEN"
# curl -X POST -H "Content-Type: application/json" -d @post1.json http://localhost:1234/contatos -H "Authorization: Bearer $ACCESS_TOKEN"
# curl -X POST -H "Content-Type: application/json" -d @post2.json http://localhost:1234/contatos -H "Authorization: Bearer $ACCESS_TOKEN"
# curl -X POST -H "Content-Type: application/json" -d @post4.json http://localhost:1234/contatos -H "Authorization: Bearer $ACCESS_TOKEN"
curl -X POST -H "Content-Type: application/json" -d @post5.json http://localhost:1234/contatos -H "Authorization: Bearer $ACCESS_TOKEN"
