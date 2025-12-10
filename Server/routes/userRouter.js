const userCtrl = require('../controller/userCtrl');
const Auth=require('../middleware/auth')


const router = require('express').Router();

router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.get('/logout',userCtrl.logout)
router.get('/admin',userCtrl.addminDetail)
router.get('/refresh_token', userCtrl.refreshtoken);
router.get('/information',Auth,userCtrl.getUser)
router.patch('/addcart', Auth, userCtrl.addCart);


module.exports = router