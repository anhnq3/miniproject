const express = require('express')
const router = express()
const useralbumController = require('./useralbumController')

//delete
router.delete('/useralbum/delete/:id', useralbumController.Delete)
router.get('/useralbum', useralbumController.all)

module.exports = router