const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.get('/edit', meController.edit);
router.put('/:id', meController.update);
router.get('/stored/news', meController.storedNews);
router.get('/trash/news', meController.trashNews);

module.exports = router;