import 'dotenv/config'
import Express from 'express';
import { createContato, readContatos, readContatoById, updateContato, deleteContato, inicializarPersistencia } from './businessrulesprovider.js';
import Joi from 'joi';

const server = Express();
const port = 1234;

server.use(Express.json());

const schema = Joi.object({
    nome: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    idade: Joi.number().min(18).max(120),
    endereco: Joi.object({
        rua: Joi.string().optional(),
        cidade: Joi.string().optional(),
        estado: Joi.string().optional()
    }).optional()
});


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

/**
 * Handler que adiciona um contato.
 * Verifica se a requisição tem o JSON com os dados do contato
 * e se ele é válido. Se for, adiciona o contato e retorna o JSON
 * com os dados do contato adicionado.
 * @param {Express.Request} request - objeto com a requisição
 * @param {Express.Response} response - objeto com a resposta
 */
function postHandler(request, response) {
    const contato = request.body;

    const { error, value } = schema.validate(contato);
    if (error) {
        return response.status(422).send(error)
    }

    try {
        createContato(contato).then(contato => {
            response.setHeader('Content-Type', 'application/json');
            response.status(201).json(contato);
        });
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
}

/**
 * Handler que retorna todos os contatos.
 * Retorna o JSON com todos os contatos no corpo da resposta.
 * @param {Express.Request} request - objeto com a requisição
 * @param {Express.Response} response - objeto com a resposta
 */
function getAllHandler(request, response) {
    try {
        readContatos().then((contatos) => {
            response.setHeader('Content-Type', 'application/json');
            // console.log(contatos);
            response.json(contatos);
        });
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
}

/**
 * Handler que retorna um contato pelo seu ID.
 * Verifica se o contato existe e retorna um erro 404 se nao encontrado.
 * Retorna o JSON com os dados do contato no corpo da resposta.
 * @param {Express.Request} request - objeto com a requisição
 * @param {Express.Response} response - objeto com a resposta
 */
function getByIdHandler(request, response) {
    const id = request.params.id;
    try {
        readContatoById(id).then((contato) => {
            if (!contato) {
                response.sendStatus(404).json({ message: 'Contato não encontrado' });
                return;
            }
            console.log(contato);
            response.setHeader('Content-Type', 'application/json');
            response.json(contato);
        });
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
}

/**
 * Handler que atualiza um contato com base no seu ID.
 * Verifica se o contato existe e retorna um erro 404 se nao encontrado.
 * Verifica se o JSON recebido e valido e retorna um erro 422 se invalido.
 * Retorna o JSON com os dados do contato atualizado no corpo da resposta.
 * @param {Express.Request} request - objeto com a requisi o
 * @param {Express.Response} response - objeto com a resposta
 */
function putHandler(request, response) {
    const id = request.params.id;
    const updatedContato = request.body;

    const { error, value } = schema.validate(updatedContato);
    if (error) {
        return response.status(422).send(error)
    }

    try {
        updateContato(id, updatedContato).then(contato => {
            response.setHeader('Content-Type', 'application/json');
            response.status(200).json(contato);
        });
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
}

/**
 * Handler que deleta um contato com base no seu ID.
 * Verifica se o contato existe e retorna um erro 404 se nao encontrado.
 * Retorna o JSON com uma mensagem de sucesso no corpo da resposta.
 * @param {Express.Request} request - objeto com a requisi o
 * @param {Express.Response} response - objeto com a resposta
 */
function deleteHandler(request, response) {
    const id = request.params.id;
    const contato = deleteContato(id);

    try {
        deleteContato(id).then(contato => {
            response.setHeader('Content-Type', 'application/json');
            response.status(200).json({ message: 'Contato excluído com sucesso!' });
        });
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
}

/// chamada que permite criar contatos após validação. usuário tem estar autorizado
server.post('/contatos', checkToken, postHandler)
/// chamada que lista todos os contatos
server.get('/contatos', getAllHandler)
/// chamada que lista apenas o contato com o id fornecido
server.get('/contatos/:id', getByIdHandler)
/// chamada que valida e atualiza os dados do contato. usuário tem estar autorizado
server.put('/contatos/:id', checkToken, putHandler)
/// chamada que deleta um contato. usuário tem que estar autorizado
server.delete('/contatos/:id', checkToken, deleteHandler) 
/// inicializa a camada de persistência
inicializarPersistencia()
/// ativa o servidor 
server.listen(port, () => console.log(`Servidor escutando na porta ${port}`));

