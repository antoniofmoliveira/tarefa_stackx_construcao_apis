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



function createItem(item) {
    lastId += 1
    item.id = lastId
    data.push(item)
    saveDataToFile()
    return item
}

function readItems() {
    loadDataFromFile()
    return data
}

function readItemById(id) {
    loadDataFromFile()
    return data.find(item => item.id === parseInt(id))
}

function updateItem(id, updatedItem) {
    const index = data.findIndex(item => item.id === parseInt(id))
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedItem, id: data[index].id }
        saveDataToFile()
        return data[index]
    }
    return null
}

function deleteItem(id) {
    const index = data.findIndex(item => item.id === parseInt(id))
    if (index !== -1) {
        const deletedItem = data.splice(index, 1)
        saveDataToFile()
        return deletedItem[0]
    }
    return null
}

export { createItem, readItems, readItemById, updateItem, deleteItem }