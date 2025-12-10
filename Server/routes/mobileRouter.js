const router = require('express').Router();
const mobileCtrl = require('../controller/mobileCtrl'); 

// Routes for /api/mobile
router.route('/mobile')
    .get(mobileCtrl.getMobiles)
    .post(mobileCtrl.createMobile);

router.route('/mobile/:id')
    .get(mobileCtrl.getMobileById)
    .delete(mobileCtrl.deleteMobile)
    .put(mobileCtrl.updateMobile);

module.exports = router;
