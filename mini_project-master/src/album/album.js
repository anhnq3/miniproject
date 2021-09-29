const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    link: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
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

module.exports = mongoose.model('albums', albumSchema)