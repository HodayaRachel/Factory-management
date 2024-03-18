const axios = require('axios')

const url = 'https://jsonplaceholder.typicode.com/users'

function getAllUsersWS() {
    return axios.get(`${url}`)
}

function getUserByIDWS(id) {
    return axios.get(`${url}/${id}`)
}

module.exports = {getAllUsersWS, getUserByIDWS}