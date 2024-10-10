import fs from 'fs'

/// os dados
let data = []
/// último id utilizado
let lastId = 0



/**
 * Salva os dados em um arquivo JSON.
 * @private
 */
function saveDataToFile() {
    fs.writeFileSync('data.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
}

/**
 * Carrega os dados do arquivo JSON e atualiza o valor da variável lastId.
 * Se o arquivo nao existir ou tiver um formato errado, retorna um erro.
 * Esse erro pode ser ignorado na carga inicial do programa.
 */
async function inicializarPersistencia() {
    try {
        data = JSON.parse(fs.readFileSync('data.json', 'utf8'))
        for (let i = 0; i < data.length; i++) {
            if (data[i].id > lastId) {
                lastId = data[i].id
            }
        }
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
    lastId += 1
    contato.id = lastId
    data.push(contato)
    saveDataToFile()
    return contato
}

/**
 * Retorna todos os contatos salvos no arquivo de dados.
 * @returns {Array.<Object>} - array de objetos de contatos
 */
async function readContatos() {
    return data
}

/**
 * Retorna o contato com o id fornecido. Se o contato nao for encontrado, retorna null.
 * @param {number} id - id do contato a ser encontrado
 * @returns {Object|null} - objeto do contato encontrado ou null se nao encontrado
 */
async function readContatoById(id) {
    return data.find(contato => contato.id === parseInt(id))
}

/**
 * Atualiza um contato do array de contatos e salva o arquivo de dados.
 * Se o contato nao for encontrado, retorna null.
 * @param {number} id - id do contato a ser atualizado
 * @param {Object} updatedContato - objeto com os dados atualizados do contato
 * @returns {Object|null} - objeto do contato atualizado ou null se nao encontrado
 */
async function updateContato(id, updatedContato) {
    const index = data.findIndex(contato => contato.id === parseInt(id))
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedContato, id: data[index].id }
        saveDataToFile()
        return data[index]
    }
    return null
}

/**
 * Exclui um contato do array de contatos e salva o arquivo de dados.
 * Se o contato nao for encontrado, retorna null.
 * @param {number} id - id do contato a ser excluido
 * @returns {Object|null} - objeto do contato excluido ou null se nao encontrado
 */
async function deleteContato(id) {
    const index = data.findIndex(contato => contato.id === parseInt(id))
    if (index !== -1) {
        const deletedContato = data.splice(index, 1)
        saveDataToFile()
        return deletedContato[0]
    }
    return null
}

// exporta as funções para utilização em outros módulos
export { createContato, readContatos, readContatoById, updateContato, deleteContato, inicializarPersistencia }