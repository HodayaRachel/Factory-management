const employeesBLL = require('../BLL/employeesBLL')

const express = require('express')
const router = express.Router()


router.get('/', async(req, res) => {
    const employees = await employeesBLL.getAllEmployees()
    return res.status(200).json({employees: employees})
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const employee = await employeesBLL.getEmployeeById(id)
    return res.status(200).json({employee: employee})
})

router.get('/byDepartment/:id', async(req, res) => {
    const id = req.params.id
    const employees = await employeesBLL.getEmployeesByDepartmentId(id)
    return res.status(200).json({employees: employees})
})

router.get('/withOutDepartment/:id', async(req, res) => {
    const id = req.params.id
    const employees = await employeesBLL.getEmployeesWithOutDepartmentId(id)
    return res.status(200).json({employees: employees})
})

router.get('/byShift/:id', async(req, res) => {
    const id = req.params.id
    const employees = await employeesBLL.getEmployeesWithOutShiftId(id)
    return res.status(200).json({employees: employees})
})

router.post('/', async(req, res) => {
    try {
        const newEmployee = req.body
        const status = await employeesBLL.addNewEmployee(newEmployee)
        return res.status(200).json({msg: status})
    } catch (err) {
        return res.status(400).json({msg: 'Error', error: err})
    } 
})

router.put('/:id', async(req, res) => {
    const id = req.params.id
    const updatedEmployee = req.body
    const status = await employeesBLL.updateEmployee(id, updatedEmployee)
    return res.status(200).json({msg: status})
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    const status = await employeesBLL.deleteEmployee(id)
    return res.status(200).json({msg: status})
})


module.exports = router