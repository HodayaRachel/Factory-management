const shiftsModel = require('../models/shiftsModel')

// get all shifts
async function getAllShifts() {
    const shifts = await shiftsModel.find({})
    return shifts
}

// get shift by id
async function getShiftsById(id) {
    const shift = await shiftsModel.findById(id)
    return shift
}

// get all shifts by employee's id
async function getShiftsByEmployee(id) {
    const shifts = await shiftsModel.find({EmployeesID: id.toString()})
    return shifts
}

// get all shifts with out this employee
async function getAllShiftsWideOutEmployeeId(id) {
    const shifts = await shiftsModel.find({EmployeesID: {$ne: id.toString()}})
    return shifts
}

// add new shift
async function addNewShift(shift) {
    const finalShift = new shiftsModel(shift)
    await finalShift.save()
    return 'Adding new shift'
}

// update shift
async function updateShift(id, shift) {
    await shiftsModel.findByIdAndUpdate(id, shift)
    return 'Updated this shift'
}

// set the format of shift
async function formatingShift(shift) {
    const detailsShift = {
        id: shift._id.toString(), 
        Date: shift.Date, 
        startHour: shift.StartingHour, 
        endHour: shift.EndingHour
    }
    return detailsShift
}

// delete shift but this option is not possibility...
async function deleteShift(id) {
    await shiftsModel.findByIdAndDelete(id)
    return 'Deleted this shift'
}

module.exports = { getAllShifts, getShiftsById, getShiftsByEmployee, getAllShiftsWideOutEmployeeId, addNewShift, updateShift, formatingShift}