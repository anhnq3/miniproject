const mongoose = require('mongoose')

const useralbumSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'albums'
    },
})

module.exports = mongoose.model('useralbum', useralbumSchema)