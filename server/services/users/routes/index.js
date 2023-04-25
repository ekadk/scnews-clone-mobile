const UserController = require("../controllers/user");
const router = require("express").Router();

router.get("/", UserController.findAll);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/:id", UserController.findById);
router.delete("/:id", UserController.deleteById);

module.exports = router;
