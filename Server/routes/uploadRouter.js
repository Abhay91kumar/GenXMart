const router = require('express').Router();
const uploadCtrl=require('../controller/uploadCtrl')
const multer = require('multer');


const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/upload', upload.single('image'),uploadCtrl.image) 

module.exports = router;
