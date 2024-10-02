let data = []
let lastId = 0

function createItem(item) {
    lastId += 1
    item.id = lastId
    data.push(item)
    return item
}

function readItems() {
    return data
}

function readItemById(id) {
    return data.find(item => item.id === parseInt(id))
}

function updateItem(id, updatedItem) {
    const index = data.findIndex(item => item.id === parseInt(id))
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedItem, id: data[index].id }
        return data[index]
    }
    return null
}

function deleteItem(id) {
    const index = data.findIndex(item => item.id === parseInt(id))
    if (index !== -1) {
        const deletedItem = data.splice(index, 1)
        return deletedItem[0]
    }
    return null
}

export { createItem, readItems, readItemById, updateItem, deleteItem }