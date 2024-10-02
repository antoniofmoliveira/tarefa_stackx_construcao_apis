import Express from 'express';

const server = Express();

server.use(Express.json());

server.get("/:nome", (req, res) => {
    res.status(200).send(req.params.nome);
});

server.post("/", (req, res) => {
    const { nome, idade, cidade } = req.body;

    if (!nome || !idade || !cidade) {
        res.status(400).send("Está faltando dados");
    }

    const valorRetorno = `Seu nome é ${nome}, você tem ${idade} anos e mora na cidade ${cidade}`;

    res.status(200).send(valorRetorno);
})

server.listen(1234, () => console.log("Servidor escutando na porta 1234"));

