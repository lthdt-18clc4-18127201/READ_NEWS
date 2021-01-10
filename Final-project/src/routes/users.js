const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');


router.delete('/:id', usersController.ban);
router.get('/stored/users', usersController.storedUsers);

module.exports = router;