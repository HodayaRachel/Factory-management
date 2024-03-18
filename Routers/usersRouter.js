const usersBLL = require('../BLL/usersBLL')
const loginBLL = require('../BLL/loginBLL')

const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
    const users = await usersBLL.getAllUsers()
    return res.status(200).json({users: users})
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const user = await usersBLL.getUserByID(id)
    return res.status(200).json({user: user})
})

router.get('/login/:username/:email', async(req, res) => {
    const username = req.params.username
    const email = req.params.email
    const status = await loginBLL.login(username, email)
    return res.status(200).json({status: status})
})

router.get('/logout/:id', async(req, res) => {
    const id = req.params.id
    const status = await loginBLL.logout(id)
    return res.status(200).json({status: status})
})

module.exports = router