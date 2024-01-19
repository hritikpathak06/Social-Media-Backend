const User = require("../models/userSchema");
const Post = require("../models/postSchema");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        success: false,
        message: "User Already Exists",
      });
    }
    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "sample public id",
        url: "sample url",
      },
    });
    const token = await user.generateToken();
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "Invalid Email",
      });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(409).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = await user.generateToken();
    // res.cookie('token',token,{httpOnly:true});
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User Logged Out Successfully",
  });
};

// Follow a user || Unfollow A User
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
      loggedInUser.following.splice(indexFollowing, 1);
      const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);
      userToFollow.followers.splice(indexFollowers, 1);
      await loggedInUser.save();
      await userToFollow.save();
      return res.status(400).json({
        success: false,
        message: "User Unfollowed",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);
      await loggedInUser.save();
      await userToFollow.save();
      return res.status(200).json({
        success: true,
        message: "User Followed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Show Following user Post
exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes")
    res.status(200).json({
      success: true,
      posts:posts.reverse(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Password
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched) {
      return res.status(404).json({
        success: false,
        message: "Please Enter the correct old password",
      });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password Updated Successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    // user avatar todo

    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User
exports.deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    const posts = user.posts;
    // Deleting all posts of the user
    for (let i = 0; i < posts.length; i++) {
      const postId = posts[i];
      try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
          continue;
        }
      } catch (postError) {
        console.error(`Error deleting post ${postId}: ${postError.message}`);
      }
    }
    res.status(200).json({
      success: true,
      message: "User and associated posts deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// My Profile
exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts");
    res.status(200).json({
      success: true,
      message: "My Profile Opened",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "All Users Fetched Successfully",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
