const express = require('express')
const router = express()

const photoController = require('./photoController')

//Delete
router.delete('/photo/remove/:id', photoController.Delete)
//Update
router.patch('/photo/:id', photoController.Update)
//Allphoto
router.get('/photo', photoController.Allphoto)
//Addphoto
router.post('/add-photo', photoController.Addphoto)

module.exports = router