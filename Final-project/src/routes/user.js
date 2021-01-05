const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get('/stored/news', userController.storedNews);

module.exports = router;