const express = require('express');
const router = express.Router();
const newsController = require('../app/controllers/NewsController');

router.get('/add', newsController.add);
router.post('/store', newsController.store);
router.get('/:id/edit', newsController.edit);
router.put('/:id', newsController.update);
router.delete('/:id', newsController.delete);
router.delete('/:id/force', newsController.forcedelete);
router.patch('/:id/restore', newsController.restore);
router.get('/:slug', newsController.show);
router.get('/', newsController.news);

module.exports = router;