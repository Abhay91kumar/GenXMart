const router = require('express').Router();
const paymentCtrl = require('../controller/paymentCtrl');
const auth=require('../middleware/auth')

router.post('/payment', auth, paymentCtrl.createPayment); 
router.get('/payment/user', auth, paymentCtrl.getPaymentsByUser);

module.exports = router;
