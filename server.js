const app = require("./app");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDatabase = require("./db/database");
const cloudinary = require("cloudinary");

// Config
dotenv.config();
connectDatabase();


// Clodinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Port
const PORT = process.env.PORT || 8000;


// Server Started
app.listen(PORT, () => {
  console.log(`Server Is Running On the port: ${PORT}`.rainbow);
});
