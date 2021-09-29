const express = require('express');
const authController = require('./authController')
const regis = require('./authMiddleware')

const router = express.Router();

//Login
router.post('/login', authController.Login)
// Update
router.patch('/login/:id', authController.Update)
// Delete
router.delete('/user/remove/:id', authController.Delete)
// All user
router.get('/alllogin', authController.Alluser)
// Register
router.post('/register', regis, authController.Register)
// Change password
router.post('/forgot', authController.Forgot)

module.exports = router