const express = require('express');
const router = express.Router();
const changeprofileController = require('../app/controllers/ChangeprofileController');

router.get('/', changeprofileController.changeprofile);

module.exports = router;