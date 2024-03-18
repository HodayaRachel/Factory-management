const departmentsBLL = require('../BLL/departmentsBLL')

const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
    const departments = await departmentsBLL.getAllDepartments()
    return res.status(200).json({departments: departments})
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const department = await departmentsBLL.getDepartmentByID(id)
    return res.status(200).json({department: department})
})

router.post('/', async(req, res) => {
    try {
        const newDepartment = req.body
        const status = await departmentsBLL.addNewDepartment(newDepartment)
        return res.status(200).json({msg: status})
    } catch (err) {
        return res.status(400).json({msg: 'Error', error: err})
    }
})

router.put('/:id', async(req, res) => {
    const id = req.params.id
    const updatedDepartment = req.body
    const status = await departmentsBLL.updateDepartment(id, updatedDepartment)
    return res.status(200).json({msg: status})
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    const status = await departmentsBLL.deleteDepartment(id)
    return res.status(200).json({msg: status})
})

module.exports = router