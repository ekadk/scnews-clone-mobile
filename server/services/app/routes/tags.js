const TagController = require('../controllers/tag');
const router = require('express').Router();

router.get('/', TagController.getAll)

module.exports = router