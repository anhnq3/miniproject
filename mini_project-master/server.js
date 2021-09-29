const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/miniproject'
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = 8080
mongoose.connect(url)

const conn = mongoose.connection

conn.on('open', function() {
    console.log('Connected')
})

app.use(express.json())

const authRouter = require('./src/auth/authAPI')
const albumRouter = require('./src/album/albumController')
const photoRouter = require('./src/photo/photoAPI')
const useralbum = require('./src/useralbum/useralbumAPI')
app.use(useralbum)
app.use(authRouter)
app.use(photoRouter)
app.use(albumRouter)

app.listen(port, () => console.log(`You are using http://localhost:${port}`))

module.exports = app