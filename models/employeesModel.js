const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    FirstName: {type: String, required: true},
    LastName : {type: String, required: true},
    StartWorkYear : {type: Number, required: true},
    DepartmentID : {type: String, required: false}
}, {versionKey: false})

module.exports = mongoose.model('employee', employeeSchema)