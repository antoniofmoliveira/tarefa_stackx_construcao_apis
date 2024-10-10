import { configDotenv } from 'dotenv'

import pkg from 'pg';
const { Pool } = pkg;


configDotenv()
const COCKROACH_URI = process.env.COCKROACH_URI
const pool = new Pool({ connectionString: COCKROACH_URI })
var query

async function inicializarPersistencia() {
    try {
        query = `CREATE TABLE IF NOT EXISTS contatos (
            id serial PRIMARY KEY,
            nome varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            idade integer NOT NULL,
            rua varchar(255),
            cidade varchar(255),
            estado varchar(255)
        )`
        await pool.query(query)
    } catch (err) {
        console.error(err)
    }
}

/**
 * Cria um novo contato com o id sequencial e salva no arquivo de dados.
 * @param {Object} contato - objeto com os dados do contato a ser criado
 * @returns {Object} - objeto do contato criado
 */
async function createContato(contato) {
    query = `INSERT INTO contatos (nome, email, idade, rua, cidade, estado) VALUES ($1 , $2 , $3 , $4 , $5, $6)  RETURNING *`
    try {
        const result = await pool.query(query, [contato.nome, contato.email, contato.idade, contato.endereco.rua, contato.endereco.cidade, contato.endereco.estado])
        return result.rows[0]
    } catch (err) {
        console.error(err)
        throw err
    }
}

/**
 * Retorna todos os contatos salvos no arquivo de dados.
 * @returns {Array.<Object>} - array de objetos de contatos
 */
async function readContatos() {
    query = `SELECT * FROM contatos`
    try {
        const result = await pool.query(query)
        return result.rows
    } catch (err) {
        console.error(err)
        throw err
    }
}

/**
 * Retorna o contato com o id fornecido. Se o contato nao for encontrado, retorna null.
 * @param {number} id - id do contato a ser encontrado
 * @returns {Object|null} - objeto do contato encontrado ou null se nao encontrado
 */
async function readContatoById(id) {
    query = `SELECT * FROM contatos WHERE id = $1`
    try {
        const result = await pool.query(query, [id])
        return result.rows[0]
    } catch (err) {
        console.error(err)
        throw err
    }
}

/**
 * Atualiza um contato do array de contatos e salva o arquivo de dados.
 * Se o contato nao for encontrado, retorna null.
 * @param {number} id - id do contato a ser atualizado
 * @param {Object} updatedContato - objeto com os dados atualizados do contato
 * @returns {Object|null} - objeto do contato atualizado ou null se nao encontrado
 */
async function updateContato(id, contato) {
    query = `UPDATE contatos SET nome = $1, email = $2, idade = $3, rua = $4, cidade = $5, estado = $6 WHERE id = $7 RETURNING *`
    try {
        const result = await pool.query(query, [contato.nome, contato.email, contato.idade, contato.endereco.rua, contato.endereco.cidade, contato.endereco.estado, id])
        return result.rows[0]
    } catch (err) {
        console.error(err)
        throw err
    }
}

/**
 * Exclui um contato do array de contatos e salva o arquivo de dados.
 * Se o contato nao for encontrado, retorna null.
 * @param {number} id - id do contato a ser excluido
 * @returns {Object|null} - objeto do contato excluido ou null se nao encontrado
 */
async function deleteContato(id) {
    query = `DELETE FROM contatos WHERE id = $1 RETURNING *`

    try {
        const result = await pool.query(query, [id])
        return result.rows[0]
    } catch (err) {
        console.error(err)
        throw err
    }
}

// exporta as funções para utilização em outros módulos
export { createContato, readContatos, readContatoById, updateContato, deleteContato, inicializarPersistencia }