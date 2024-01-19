const Post = require("../models/postSchema");
const User = require("../models/userSchema");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: "Sample Public Id",
        url: "sample public url",
      },
      owner: req.user._id,
    };
    const post = await Post.create(newPostData);
    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();
    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not Found",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized",
      });
    }
    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(req.user._id);
    user.posts.splice(index, 1);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Like Post
exports.likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Liked",
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


// Update Caption
exports.updateCaption = async(req,res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).json({
        success:false,
        message:"Post Not Found"
      })
    };
    if(post.owner.toString() !== req.user._id.toString()){
      return res.status(401).json({
        success:false,
        message:"Unauthorized"
      })
    }
    post.caption = req.body.caption;
    await post.save();
    res.status(200).json({
      success:true,
      message:"Caption Updated Successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
