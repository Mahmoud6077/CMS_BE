const router = require("express").Router()
const pageDetailCtrl = require('../controllers/pageDetail')
router.post('', pageDetailCtrl.pageDetail_create_post)
// router.get('/header', pageDetailCtrl.pageDetail_show_header)
// router.get('/footer', pageDetailCtrl.pageDetail_show_footer)
router.get('/all', pageDetailCtrl.pageDetail_index_get)
router.get('', pageDetailCtrl.pageDetail_show_get)
router.put('', pageDetailCtrl.pageDetail_update_put)
router.delete('', pageDetailCtrl.pageDetail_delete)

module.exports = router