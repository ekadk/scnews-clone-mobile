const UserController = require("../controllers/UserController");
const router = require("express").Router();

router.get("/", UserController.getAll);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/:id", UserController.getById);
router.delete("/:id", UserController.deleteById);

module.exports = router;
