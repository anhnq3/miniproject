const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 30
    },
    username: {
        type: String,
        minlength: 3,
        maxlength: 30,
        unique: true
    },
    password: {
        type: String,
        minlength: 3,
        required: true
    },
    email: {
        type: String,
        email: true,
        required: true,
        unique: true
    },
    createAt: {
        type: Date,
    },
    updateAt: {
        type: Date    
    },
    status: {
        type: String,
        enum: ['user', 'admin'],
        default : 'user'
    }
})

module.exports = mongoose.model('users', userSchema)