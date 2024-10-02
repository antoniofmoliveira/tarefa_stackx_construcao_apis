#!/bin/bash
# chamada de api que exclui um item de forma não segura. não funcionará mais após implementada autorização
curl -X DELETE http:/localhost:1234/items/1