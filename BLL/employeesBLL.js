const employeesModel = require('../models/employeesModel')
const shiftsBLL = require('../BLL/shiftsBLL')
const shiftsModel = require('../models/shiftsModel')
const departmentsBLL = require('../BLL/departmentsBLL')


// get all employees
async function getAllEmployees() {
    const empList = await employeesModel.find({})
    const employees = Promise.all(empList.map(async(emp) => {
        const employee = await formatingEmployee(emp)
        return employee
    }))
    return employees 
}

// get employee by id
async function getEmployeeById(id) {
    const emp = await employeesModel.findById(id)
    const employee = await formatingEmployee(emp)
    return employee
}

// get employees by department id
async function getEmployeesByDepartmentId(departmentID) {
    const empList = await employeesModel.find({DepartmentID: departmentID})
    const employees = Promise.all(empList.map(async(emp) => {
        const employee = await formatingEmployee(emp)
        return employee
    }))
    return employees 
}

// get employees of all departments with out this department
async function getEmployeesWithOutDepartmentId(departmentID) {
    const empList = await employeesModel.find({DepartmentID: {$ne: departmentID}})
    const employees = Promise.all(empList.map(async(emp) => {
        const employee = await formatingEmployee(emp)
        return employee
    }))
    return employees 
}

// get employees of all departments with out this department
async function getEmployeesWithOutShiftId(shiftID) {

    const shift = await shiftsBLL.getShiftsById(shiftID)

    const empList = await employeesModel.find({_id: {$nin: shift.EmployeesID}})
    const employees = Promise.all(empList.map(async(emp) => {
        const employee = await formatingEmployee(emp)
        return employee
    }))
    return employees 
}

// set the format of employee
async function formatingEmployee(employee) {

    if (employee) {
        const shifts = await shiftsBLL.getShiftsByEmployee(employee.id.toString())

        shifts?.map(async(shift) => {
            const finalShift = await shiftsBLL.formatingShift(shift)
            return finalShift
        })
    
        const finalEmployee = {
            id: employee.id.toString(),
            name: employee.FirstName + ' ' + employee.LastName,
            department: employee.DepartmentID,
            startWorkYear: employee.StartWorkYear,
            shifts: shifts
        }

        return finalEmployee
    }
    return null
    
}


// add new employee
async function addNewEmployee(employee) {
    const finalEmployee = new employeesModel(employee)
    await finalEmployee.save()
    return 'Adding new employee'
}

// update employee
async function updateEmployee(id, employee) {

    await employeesModel.findByIdAndUpdate(id, employee)

    // when want to update department of employee  
    if (employee.DepartmentID) {

        // check if this employee is manager and update too in department's manager
        const isManager = await departmentsBLL.getDepartmentByManagerID(id)
        if(isManager.length !== 0) {
            await departmentsBLL.updateDepartment(isManager[0]._doc._id.toString(), {Manager: null})
        }
    }
    return 'Updated this employee'
}

// delete employee and all his shifts and if he manager of department, delete it also
async function deleteEmployee(id) {
    const status = await employeesModel.findByIdAndDelete(id)

    // delete emp in shifts
    const shifts = await shiftsBLL.getShiftsByEmployee(id)

    shifts.forEach(async(shift) => {
        const empsID = shift.EmployeesID
        empsID.splice(empsID.findIndex(e => e === id), 1);
        await shiftsBLL.updateShift(shift._id.toString(), {EmployeesID: empsID})
    })

    // delete emp in departments if this emp is manager
    const isManager = await departmentsBLL.getDepartmentByManagerID(id)

    if(isManager.length !== 0) {
        await departmentsBLL.updateDepartment(isManager[0]._doc._id.toString(), {Manager: null})
    }
    return 'Deleted this employee'
}

module.exports = { getAllEmployees, getEmployeeById, getEmployeesByDepartmentId, getEmployeesWithOutDepartmentId, getEmployeesWithOutShiftId, addNewEmployee, updateEmployee, deleteEmployee }