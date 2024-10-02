import 'dotenv/config'
import Express from 'express';
import { createContato, readContatos, readContatoById, updateContato, deleteContato, loadDataFromFile } from './businessrules.js';

const server = Express();
const port = 1234;

server.use(Express.json());


/**
 * Função middleware que verifica se o usuário tem autorização para executar a requisição.
 * Verifica se a requisição tem o cabeçalho "Authorization" e se o valor do token é igual ao valor de ACCESS_TOKEN na variável de ambiente.
 * Se o token for inválido ou nao for encontrado, retorna um erro 401.
 * @param {Express.Request} request - objeto com a requisição
 * @param {Express.Response} response - objeto com a resposta
 * @param {Express.NextFunction} next - função que permite continuar a execução da requisição
 */
function checkToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        return response.status(401).send('Faltou autorização do usuário');
    }
    const [_, token] = authHeader.split(' ');
    if (token !== process.env.ACCESS_TOKEN) {
        return response.status(401).send('Token do usuário inválido');
    }
    next();
}

/// chamada que permite criar contatos após validação. usuário tem estar autorizado
server.post('/contatos', checkToken, (request, response) => {
    const contato = request.body;
    if (!contato.nome) {
        return response.status(422).send("Nome é obrigatório")
    }
    if (!contato.email) {
        return response.status(422).send("Email é obrigatório")
    }
    if (!contato.idade) {
        return response.status(422).send("Idade é obrigatório")
    }
    const newContato = createContato(contato);
    response.status(201).json(newContato);
})

/// chamada que lista todos os contatos
server.get('/contatos', (request, response) => {
    const contatos = readContatos();
    response.json(contatos);
})

/// chamada que lista apenas o contato com o id fornecido
server.get('/contatos/:id', (request, response) => {
    const id = request.params.id;
    const contato = readContatoById(id);

    if (contato) {
        response.json(contato);
    } else {
        response.sendStatus(404).json({ message: 'Contato não encontrado' });
    }
})

/// chamada que valida e atualiza os dados do contato. usuário tem estar autorizado
server.put('/contatos/:id', checkToken, (request, response) => {
    const id = request.params.id;
    const updatedContato = request.body;
    if (!updatedContato.nome) {
        return response.status(422).send("Nome é obrigatório")
    }
    if (!updatedContato.email) {
        return response.status(422).send("Email é obrigatório")
    }
    if (!updatedContato.idade) {
        return response.status(422).send("Idade é obrigatório")
    }
    const contato = updateContato(id, updatedContato);
    if (contato) {
        response.json(contato);
    } else {
        response.sendStatus(404).json({ message: 'Contato não encontrado' });
    }
})


/// chamada que deleta um contato. usuário tem que estar autorizado
server.delete('/contatos/:id', checkToken, (request, response) => {
    const id = request.params.id;
    const contato = deleteContato(id);
    if (contato) {
        response.json({ message: 'Contato excluído com sucesso!' });
    } else {
        response.sendStatus(404).json({ message: 'Contato não encontrado' });
    }
})

/// carrega dados iniciais de contatos se disponíveis
loadDataFromFile()

/// ativa o servidor 
server.listen(port, () => console.log(`Servidor escutando na porta ${port}`));

