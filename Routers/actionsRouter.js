const actionBLL = require('../BLL/actionsBLL')

const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
    const actions = await actionBLL.getAllActions()
    return res.status(200).json({actions: actions})
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const action = await actionBLL.lastActionAllowed(id)
    return res.status(200).json({action: action})
})

router.post('/', async(req, res) => {
    try {
        const id = req.body.id
        const status = await actionBLL.addAction(id)
        return res.status(200).json({msg: status})
    } catch (err) {
        return res.status(400).json({msg: 'Error', error: err}) 
    }
})

module.exports = router

