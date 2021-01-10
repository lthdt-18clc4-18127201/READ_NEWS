const express = require('express');
const router = express.Router();
const webController = require('../app/controllers/WebController');


router.get('/stored/users', webController.storedUsers);

module.exports = router;