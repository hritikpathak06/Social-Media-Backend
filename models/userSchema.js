const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a name"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: [true, "Please Enter a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter a password"],
    minLength: [6, "Password should must be of 6 characters or more"],
  },
  posts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});


// Hash Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});


// Compare Password
userSchema.methods.comparePassword = async function(password){
  return bcrypt.compare(password,this.password);
};


// Generate Token
userSchema.methods.generateToken = async function(){
  return jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:"15d"})
};

const User = mongoose.model("User", userSchema);

module.exports = User;
