#!/bin/bash
# chamada de api que altera um contato de forma não segura. não funcionará mais até implementada autorização
curl -X PUT -H "Content-Type: application/json" -d @put.json http:/localhost:1234/contatos/1