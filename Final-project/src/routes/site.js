const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/:slug', siteController.about);
router.get('/', siteController.home);
router.post('/search',siteController.search);
module.exports = router;