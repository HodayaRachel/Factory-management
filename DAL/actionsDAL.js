const jFile = require('jsonfile')
const path = require('path')

const location = path.join(__dirname, '../data/actions.json')

async function getAllActions() {
    const {actions} = await jFile.readFile(location)
    return actions
}

async function addAction(actions) {
    await jFile.writeFile(location, {actions: actions})
    return "Add this action"
}

module.exports = { getAllActions, addAction}