# Tarefa Construção de APIs - StackX


# Passo 1: adicionar persistência via módulo filesystem

- adicionadas as funções `saveDataToFile`, que é chamada a cada alteração de dados, e `loadDataFromFile`, que é chamada na inicialização do servidor

# Passo 2: adicionar validações

- adicionada a função `checkToken` para verificar se o cliente tem a autorização necessária para adicionar, modificar e excluir dados. O token é carregado a partir de variáveis de ambiente tanto no cliente como no servidor.

- alterada a entidade `item` para entidade `contato` contendo nome, email, idade e endereço do contato
