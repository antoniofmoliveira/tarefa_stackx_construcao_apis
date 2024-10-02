import 'dotenv/config'
import Express from 'express';
import { createContato, readContatos, readContatoById, updateContato, deleteContato, loadDataFromFile } from './businessrules.js';

const server = Express();
const port = 1234;

server.use(Express.json());

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

server.post('/contatos', checkToken, (request, response) => {
    const contato = request.body;
    const newContato = createContato(contato);
    response.status(201).json(newContato);
})

server.get('/contatos', (request, response) => {
    const contatos = readContatos();
    response.json(contatos);
})

server.get('/contatos/:id', (request, response) => {
    const id = request.params.id;
    const contato = readContatoById(id);
    if (contato) {
        response.json(contato);
    } else {
        response.sendStatus(404).json({ message: 'Contato não encontrado' });
    }
})

server.put('/contatos/:id', checkToken, (request, response) => {
    const id = request.params.id;
    const updatedContato = request.body;
    const contato = updateContato(id, updatedContato);
    if (contato) {
        response.json(contato);
    } else {
        response.sendStatus(404).json({ message: 'Contato não encontrado' });
    }
})

server.delete('/contatos/:id', checkToken, (request, response) => {
    const id = request.params.id;
    const contato = deleteContato(id);
    if (contato) {
        response.json({ message: 'Contato excluído com sucesso!' });
    } else {
        response.sendStatus(404).json({ message: 'Contato não encontrado' });
    }
})
loadDataFromFile()

server.listen(port, () => console.log(`Servidor escutando na porta ${port}`));

