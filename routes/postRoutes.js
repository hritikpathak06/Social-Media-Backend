const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  updateCaption,
  addComment,
  deleteComment,
} = require("../controller/postController");
const { isAuthenticated } = require("../middlewares/authentication");
const router = express.Router();


// Create Post
router.route("/post/upload").post(isAuthenticated, createPost);

// Like And Unlike Post
router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost);

// Delete Post
router.route("/post/:id").delete(isAuthenticated, deletePost);

// Update Caption
router.route("/post/:id").put(isAuthenticated, updateCaption);


// Add & Update And Delete Comments
router
  .route("/post/comment/:id")
  .put(isAuthenticated, addComment)
  .delete(isAuthenticated, deleteComment);


module.exports = router;
