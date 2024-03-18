const usersWS_DAL = require('../DAL/usersWS_DAL')
const usersModel = require('../models/usersModel')

// load data of users and push them to DB
async function loadData() {
    const users = await getAllUsers()
    const {data} = await usersWS_DAL.getAllUsersWS()
    if(users.length === 0) {
        data.map((u) => {
            const numActions = Math.floor(Math.random() * 4) + 10
            const newUser = {FullName: u.name, NumOfActions: numActions}
            addNewUser(newUser)
        })
    }
    return 'Finished load data'
}

// get all users
async function getAllUsers() {
    const users = await usersModel.find({})
    return users
}

// get user by id
async function getUserByID(id) {
    const user = await usersModel.findById(id)
    return user
}

// add user
async function addNewUser(user) {
    const finalUser = new usersModel(user)
    await finalUser.save()
    return 'Adding new user'
}

// update user but this option is not possibility...
async function updateUser(id, user) {
    await usersModel.findByIdAndUpdate(id, user)
    return 'Updated this user'
}

// delete user but this option is not possibility...
async function deleteUser(id) {
    await usersModel.findByIdAndDelete(id)
    return 'Deleted this user'
}

module.exports = { getAllUsers, getUserByID, loadData}