const CategoryController = require('../controllers/CategoryController');
const router = require('express').Router();

router.get('/', CategoryController.getAll)
router.post('/', CategoryController.add)
router.get('/:id', CategoryController.getById)
router.put('/:id', CategoryController.updateById)
router.delete('/:id', CategoryController.deleteById)

module.exports = router