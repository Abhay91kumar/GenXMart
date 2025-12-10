const fashionCtrl=require('../controller/fashionCtrl')
const router = require('express').Router();

router.route('/fashion')
    .get(fashionCtrl.getFashion)
    .post(fashionCtrl.createFashion)

router.route('/fashion/:id')
    .get(fashionCtrl.getFashionById)
    .delete(fashionCtrl.deleteFashion)
    .put(fashionCtrl.updateFashion)

module.exports = router;