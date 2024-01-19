const express = require("express");
const { createPost, likeAndUnlikePost, deletePost, updateCaption } = require("../controller/postController");
const { isAuthenticated } = require("../middlewares/authentication");
const router = express.Router();

router.route("/post/upload").post(isAuthenticated,createPost);

router.route("/post/:id").get(isAuthenticated,likeAndUnlikePost);

router.route("/post/:id").delete(isAuthenticated,deletePost);

router.route("/post/:id").put(isAuthenticated,updateCaption);


module.exports = router;