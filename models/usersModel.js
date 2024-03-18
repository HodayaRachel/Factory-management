const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    FullName: {type: String, required: true},
    NumOfActions: {type: Number, required: true}
}, {versionKey: false})

module.exports = mongoose.model('user', userSchema)
