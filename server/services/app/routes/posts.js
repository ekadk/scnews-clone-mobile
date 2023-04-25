const PostController = require("../controllers/post");
const router = require("express").Router();

router.get("/", PostController.getAllPosts);
router.post("/", PostController.addPost);
router.get("/:id", PostController.getPostById);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

module.exports = router;
