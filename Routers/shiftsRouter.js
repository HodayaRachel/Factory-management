const shiftsBLL = require('../BLL/shiftsBLL')

const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
    const shifts = await shiftsBLL.getAllShifts()
    return res.status(200).json({shifts: shifts})
})

router.get('/byEmloyeeID/:id', async(req, res) => {
    const id = req.params.id
    const shifts = await shiftsBLL.getAllShiftsWideOutEmployeeId(id) 
    return res.status(200).json({shifts: shifts})
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const shift = await shiftsBLL.getShiftsById(id) 
    return res.status(200).json({shift: shift})
})

router.post('/', async(req, res) => {
    try {
        const newShift = req.body
        const status = await shiftsBLL.addNewShift(newShift)
        return res.status(200).json({msg: status})
    } catch (err) {
        return res.status(400).json({msg: 'Error', error: err})
    }
})

router.put('/:id', async(req, res) => {
    const id = req.params.id
    const updatedShift = req.body
    const status = await shiftsBLL.updateShift(id, updatedShift)
    return res.status(200).json({msg: status})
})


module.exports = router