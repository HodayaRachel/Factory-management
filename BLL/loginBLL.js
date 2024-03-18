const usersDAL = require('../DAL/usersWS_DAL');
const usersModel = require('../models/usersModel')
const actionsBLL = require('../BLL/actionsBLL')

// login function
async function login(username, email) {
    const {data} = await usersDAL.getAllUsersWS()
    const user = data.find(u => u.username === username && u.email === email)
    console.log(user);
    if(user) {
        const userDB = await usersModel.findOne({FullName: user.name})
        if (userDB) {
            return {id: userDB._id.toString(), user: user.name, status: true}
        }
        return {status: false}
    }
    return {status: false}
}

// logout function
async function logout(id) {
    const lastAction = await actionsBLL.lastActionAllowed(id)
    if (lastAction > 0 || lastAction.actionAllowed > 0) {
        return true
    }
    return false
}

module.exports = {login, logout}