const addressCtrl = require('../controller/addressCtrl');
const router = require('express').Router();
const auth = require('../middleware/auth');

router.route('/address')
    .get(auth, addressCtrl.getAddress)
    .post(auth, addressCtrl.createAddress);

router.route('/address/:id')
    .get(auth, addressCtrl.getAddressById)
    .put(auth, addressCtrl.updateAddress)
    .delete(auth, addressCtrl.deleteAddress);

module.exports = router;