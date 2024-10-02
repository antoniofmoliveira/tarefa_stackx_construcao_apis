import Express from 'express';

const server = Express();
const port = 1234;

server.use(Express.json());



server.listen(port, () => console.log(`Servidor escutando na porta ${port}`));

