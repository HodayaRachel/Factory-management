const mongoose = require('mongoose')

const shiftSchema = new mongoose.Schema({
    Date: {type: String, required: true},
    StartingHour: {type: Number, required: true},
    EndingHour: {type: Number, required: true},
    EmployeesID : {type: Array, required: false}
}, {versionKey: false})

module.exports = mongoose.model('shift', shiftSchema)