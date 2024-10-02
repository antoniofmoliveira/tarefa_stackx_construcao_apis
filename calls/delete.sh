#!/bin/bash
# chamada de api que exclui um contato de forma não segura. não funcionará mais após implementada autorização
curl -X DELETE http:/localhost:1234/contatos/1