import fs from 'fs'

let data = []
let lastId = 0


function saveDataToFile() {
    fs.writeFileSync('data.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
}

function loadDataFromFile() {
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



function createContato(contato) {
    lastId += 1
    contato.id = lastId
    data.push(contato)
    saveDataToFile()
    return contato
}

function readContatos() {
    return data
}

function readContatoById(id) {
    return data.find(contato => contato.id === parseInt(id))
}

function updateContato(id, updatedContato) {
    const index = data.findIndex(contato => contato.id === parseInt(id))
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedContato, id: data[index].id }
        saveDataToFile()
        return data[index]
    }
    return null
}

function deleteContato(id) {
    const index = data.findIndex(contato => contato.id === parseInt(id))
    if (index !== -1) {
        const deletedContato = data.splice(index, 1)
        saveDataToFile()
        return deletedContato[0]
    }
    return null
}

export { createContato, readContatos, readContatoById, updateContato, deleteContato, loadDataFromFile }