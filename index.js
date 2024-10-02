import 'dotenv/config'
import Express from 'express';
import { createItem, readItems, readItemById, updateItem, deleteItem, loadDataFromFile } from './businessrules.js';

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

server.post('/items', checkToken, (request, response) => {
    const item = request.body;
    const newItem = createItem(item);
    response.status(201).json(newItem);
})

server.get('/items', (request, response) => {
    const items = readItems();
    response.json(items);
})

server.get('/items/:id', (request, response) => {
    const id = request.params.id;
    const item = readItemById(id);
    if (item) {
        response.json(item);
    } else {
        response.sendStatus(404).json({ message: 'Item não encontrado' });
    }
})

server.put('/items/:id', checkToken, (request, response) => {
    const id = request.params.id;
    const updatedItem = request.body;
    const item = updateItem(id, updatedItem);
    if (item) {
        response.json(item);
    } else {
        response.sendStatus(404).json({ message: 'Item não encontrado' });
    }
})

server.delete('/items/:id', checkToken, (request, response) => {
    const id = request.params.id;
    const item = deleteItem(id);
    if (item) {
        response.json({ message: 'Item excluído com sucesso!' });
    } else {
        response.sendStatus(404).json({ message: 'Item não encontrado' });
    }
})
loadDataFromFile()

server.listen(port, () => console.log(`Servidor escutando na porta ${port}`));

