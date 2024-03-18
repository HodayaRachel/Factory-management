const actionDAL = require("../DAL/actionsDAL")
const usersModel = require("../models/usersModel")


async function getAllActions() {
    const allActions = await actionDAL.getAllActions()
    return allActions
}

async function addAction(id) {
    const allActions = await getAllActions()
    const action = await newAction(id)
    allActions.push(action)
    const status = await actionDAL.addAction(allActions)
    return status
}

async function newAction(id) {
    const user = await usersModel.findById(id)    
    const date = new Date().toLocaleDateString('en-GB')
    const lastAction = await lastActionAllowed(user._id.toString(), date)

    const newAction = {
        id: user._id.toString(),
        maxActions: user.NumOfActions,
        date: date,
    }

    if (lastAction !== undefined) {
        lastAction.actionAllowed ? newAction.actionAllowed = lastAction.actionAllowed - 1 : newAction.actionAllowed = lastAction - 1
    } else {
        newAction.actionAllowed = user.NumOfActions -1
    }
    
    return newAction
}

async function lastActionAllowed(id) {

    const allActions = await getAllActions()
    const date = new Date().toLocaleDateString('en-GB')
    let lastAction = allActions.reverse().find((action) => action.id === id && action.date === date);
    if (lastAction === undefined) {
        const user = await usersModel.findById(id) 
        lastAction = user.NumOfActions 
    }
    return lastAction
}

module.exports = {getAllActions, addAction, lastActionAllowed}