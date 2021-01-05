const express = require('express');
const router = express.Router();
const newsController = require('../app/controllers/NewsController');

router.get('/add', newsController.add);
router.post('/store', newsController.store);
router.get('/:id/edit', newsController.edit);
router.get('/:slug', newsController.show);
router.get('/', newsController.news);

module.exports = router;