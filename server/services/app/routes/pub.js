const CategoryController = require('../controllers/category');
const PostController = require('../controllers/post');

const router = require('express').Router();

router.get('/posts', PostController.pubGetAllPosts)
router.get('/posts/:id', PostController.pubGetPostById)
router.get('/categories', CategoryController.pubGetAll)
router.get('/categories/:id', CategoryController.pubGetById)

module.exports = router