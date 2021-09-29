const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'albums'
    },
    link: {
        type: String,
        required: true
    },
    createAt: {
        type: Date
    },
    updateAt: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

module.exports = mongoose.model('photo', photoSchema)