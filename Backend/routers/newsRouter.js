const express = require('express');
const { getAllnews, createNews, updateNews, deleteNews, getMyNews } = require('../controllers/newsController');
const checkLogin = require('../middlewares/checkLogin');
const checkAdmin = require('../middlewares/checkAdmin');

const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads')
    },
    filename:function(req,file,cb){
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage: storage})

const router = express.Router()

router.get('/', getAllnews)
router.get('/mynews',checkLogin,checkAdmin,  getMyNews)
router.post('/create',upload.single("image"),checkLogin,checkAdmin,  createNews)
router.put('/update/:id',checkLogin,checkAdmin, updateNews)
router.delete('/delete/:id',checkLogin,checkAdmin,deleteNews)



module.exports = router