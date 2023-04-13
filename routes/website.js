const router = require("express").Router()
const websiteCtrl = require('../controllers/website')
const auth = require('../middleware/auth')

let methodOverride = require("method-override");
router.use(methodOverride('_method'));

router.get('', websiteCtrl.website_show_get)
router.post('', auth.isAuth, websiteCtrl.website_create_post)
router.put('', auth.isAuth, websiteCtrl.website_edit_put)
router.post('/delete', auth.isAuth, websiteCtrl.website_delete)
router.post('', auth.isAuth, websiteCtrl.website_create_post)
router.get('/all', auth.isAdmin, websiteCtrl.website_index_get)
router.get('/domain', websiteCtrl.website_showByDomain_get)
router.post('/user', auth.isAuth, websiteCtrl.website_showByUser_get)

module.exports = router