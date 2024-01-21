const express = require("express");
const {
  registerUser,
  loginUser,
  followUser,
  getPostOfFollowing,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUsers,
  logout,
  getMyPosts,
  getUserPosts,
} = require("../controller/userController");
const { isAuthenticated } = require("../middlewares/authentication");
const router = express.Router();

// Register User
router.route("/register").post(registerUser);

// Login User
router.route("/login").post(loginUser);

// Logout User
router.route("/logout").get(logout);

// Follow & Unfollow User
router.route("/follow/:id").get(isAuthenticated, followUser);

// Get Post Of Following
router.route("/posts").get(isAuthenticated, getPostOfFollowing);

// Update Password
router.route("/update/password").put(isAuthenticated, updatePassword);

// Update Profile
router.route("/update/profile").put(isAuthenticated, updateProfile);

// Delete My Profile
router.route("/delete/profile").delete(isAuthenticated, deleteMyProfile);

// Get My Profile
router.route("/me").get(isAuthenticated, myProfile);

// Get User Profile
router.route("user/:id").get(isAuthenticated,getUserProfile);

// Get All Users
router.route("/all/users").get(isAuthenticated,getAllUsers);

// Get My Post
router.route("/myposts").get(isAuthenticated,getMyPosts);

// Get User Posts
router.route("/userposts/:id").get(isAuthenticated,getUserPosts);

module.exports = router;
