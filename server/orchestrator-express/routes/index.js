const router = require("express").Router();
const userRouter = require("./users");
const postRouter = require("./posts");
const categoryRouter = require("./categories");

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/categories", categoryRouter);

module.exports = router;
