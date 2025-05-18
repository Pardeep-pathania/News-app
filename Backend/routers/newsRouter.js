const express = require('express');
const { getAllnews, createNews, updateNews, deleteNews, getMyNews } = require('../controllers/newsController');
const checkLogin = require('../middlewares/checkLogin');
const checkAdmin = require('../middlewares/checkAdmin');

const router = express.Router()

router.get('/', getAllnews)
router.get('/mynews',checkLogin,checkAdmin,  getMyNews)
router.post('/create',checkLogin,checkAdmin,  createNews)
router.put('/update/:id',checkLogin,checkAdmin, updateNews)
router.delete('/delete/:id',checkLogin,checkAdmin,deleteNews)



module.exports = router