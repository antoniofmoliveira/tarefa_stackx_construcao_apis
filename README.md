# Tarefa Construção de APIs - StackX


## Passo 1: adicionar persistência via módulo filesystem

- adicionadas as funções `saveDataToFile`, que é chamada a cada alteração de dados, e `loadDataFromFile`, que é chamada na inicialização do servidor

## Passo 2: adicionar validações

- adicionada a função `checkToken` para verificar se o cliente tem a autorização necessária para adicionar, modificar e excluir dados. O token é carregado a partir de variáveis de ambiente tanto no cliente como no servidor.

- alterada a entidade `item` para entidade `contato` contendo nome, email, idade e endereço do contato

- adicionada a validação para nome, email e idade para a entidade `contato`

## Passo 3: adicionar documentação

- adicionado jsdocs às funções.
- 
- o folder `calls` contém exemplos de chamadas da api via `curl`

## Passo 4: implementar persistência em banco de dados

- criado businessrulesdb.json

- ativado container cockroackdb (postgresql)

- alteradas as assinaturas das funções para serem async e compatíveis com banco de dados

- criadas as SQLs necessárias

* notar que o id da versão em texto é diferente da versão em banco de dados e as chamadas curl devem ser ajustadas de acordo
