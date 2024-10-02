#!/bin/bash
# chamada de api que altera um item de forma não segura. não funcionará mais até implementada autorização
curl -X PUT -H "Content-Type: application/json" -d @put.json http:/localhost:1234/items/1