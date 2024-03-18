const departmentsModel = require('../models/departmentsModel')
const employeesModel = require('../models/employeesModel')
const employeesBLL = require('../BLL/employeesBLL')
const shiftsBLL = require('../BLL/shiftsBLL')

// get all departments
async function getAllDepartments() {
    const departments = await departmentsModel.find({})
    const departmentList = Promise.all(departments.map(async(dep) => {
        const department = await formatingDepartment(dep)
        return department
    }))
    return departmentList
}

// get department by id
async function getDepartmentByID(id) {
    const depart = await departmentsModel.findById(id)
    const department = await formatingDepartment(depart)
    return department
}

// get department by manager (employee) id
async function getDepartmentByManagerID(managerId) {
    const department = await departmentsModel.find({Manager: managerId})
    return department
}

// get all employees in this department
async function getEmployeesOfDepartment(id) {
    const listEmployees = await employeesModel.find({DepartmentID: id})    
    return listEmployees
}

// add new department
async function addNewDepartment(department) {
    const finalDepartment = new departmentsModel(department)
    await finalDepartment.save()
    const departmentWithThisManager = await departmentsModel.find({$and: [{ _id: { $ne: finalDepartment._id.toString() } },{ Manager: finalDepartment.Manager }]})
    if (departmentWithThisManager.length > 0) {
        departmentWithThisManager.forEach(async(department) => {
            await updateDepartment(department._id.toString(), {Manager: null})
        })
    }
    const status = await employeesModel.findByIdAndUpdate(finalDepartment.Manager, {DepartmentID: finalDepartment._id.toString()})
    return 'Adding new department'
}

// update department
async function updateDepartment(id, department) {
    await departmentsModel.findByIdAndUpdate(id, department)
    return 'Updated this department'
}

// delete department and all his employees in this department
async function deleteDepartment(id) {
    await departmentsModel.findByIdAndDelete(id)
    const empList = await getEmployeesOfDepartment(id)

    // delete every employees in department
    empList?.forEach(async(emp) => {

        // delete employee in department 
        const status = await employeesModel.findByIdAndDelete(emp._id.toString())

        // delete employee in shifts
        const shifts = await shiftsBLL.getShiftsByEmployee(emp._id.toString())
    
        shifts.forEach(async(shift) => {
            const empsID = shift.EmployeesID
            empsID.splice(empsID.findIndex(e => e === id), 1);
            await shiftsBLL.updateShift(shift._id.toString(), {EmployeesID: empsID})
        })
    
    })
    return 'Deleted this department'
}

// set the format of department
async function formatingDepartment(department) {

    if (department) {
        const detailsDepartment = {}
        const id = department._id.toString()
        const employees = await getEmployeesOfDepartment(id)
    
        detailsDepartment.id = department._id.toString()
        detailsDepartment.name = department.Name
        detailsDepartment.manager = null
    
        if (department.Manager !== null && department.Manager.length > 0) {
            const id = department.Manager
            const manager = await employeesModel.findById(id)
            detailsDepartment.manager = manager.FirstName + ' ' + manager.LastName
        }
    
        detailsDepartment.listEmployees = employees
        
        return detailsDepartment  
    }
}


module.exports = {getAllDepartments, getDepartmentByID, getDepartmentByManagerID, addNewDepartment, updateDepartment, deleteDepartment }