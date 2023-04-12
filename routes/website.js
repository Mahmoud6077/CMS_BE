const router = require("express").Router()
const websiteCtrl = require('../controllers/website')
const auth = require('../middleware/auth')

router.get('', websiteCtrl.website_show_get)
router.post('', auth.isAuth, websiteCtrl.website_create_post)
router.get('/all', websiteCtrl.website_index_get)
router.get('/domain', websiteCtrl.website_showByDomain_get)
router.get('/user', websiteCtrl.website_showByUser_get)

module.exports = router