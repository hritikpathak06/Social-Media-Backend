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
} = require("../controller/userController");
const { isAuthenticated } = require("../middlewares/authentication");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logout);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/posts").get(isAuthenticated, getPostOfFollowing);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/delete/profile").delete(isAuthenticated, deleteMyProfile);

router.route("/me").get(isAuthenticated, myProfile);

router.route("user/:id").get(isAuthenticated,getUserProfile);

router.route("/all/users").get(isAuthenticated,getAllUsers);

module.exports = router;
