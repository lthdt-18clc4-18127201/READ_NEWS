const express = require('express');
const router = express.Router();
const newsController = require('../app/controllers/NewsController');
const multer  = require('multer')
const { update } = require('../app/controllers/NewsController');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });


router.get('/add', newsController.add);
router.post('/store', upload.single('img'), newsController.store);
router.post('/:id/cmt', newsController.comment);
router.get('/:id/edit', newsController.edit);
router.put('/:id', upload.single('img'),newsController.update);
router.delete('/:id', newsController.delete);
router.delete('/:id/force', newsController.forcedelete);
router.patch('/:id/restore', newsController.restore);
router.get('/:slug', newsController.show);
router.get('/', newsController.news); 

module.exports = router;