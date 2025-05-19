
const express = require('express')
const { getAllUsers, registerUser, loginUser, deleteUser, updateUser } = require('../controllers/userController')
const checkLogin = require('../middlewares/checkLogin')
const checkAdmin = require('../middlewares/checkAdmin')

const router = express.Router()

router.get('/',checkLogin,checkAdmin, getAllUsers)

router.post('/signup',registerUser)
router.post('/signin',loginUser)
router.post('/update/:id',updateUser)
router.post('/delete/:id',deleteUser)



module.exports = router