const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Manager: {type: String, required: true}
}, {versionKey: false})

module.exports = mongoose.model('department', departmentSchema)