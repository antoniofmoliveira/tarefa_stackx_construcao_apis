#!/bin/bash
# chamada de api que adiciona um item de forma não segura. não funcionará mais após implementada autorização
curl -X POST -H "Content-Type: application/json" -d @post1.json http://localhost:1234/items
curl -X POST -H "Content-Type: application/json" -d @post2.json http://localhost:1234/items